package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool) // Connected clients
var broadcast = make(chan string)            // Broadcast channel
// A slice with max capacity of 10 for storing calculations sent by the server.
// With larger volume of data, we would use a database service like DynamoDB or MongoDB.
var calcLogs = make([]string, 0, 10)

func main() {
	router := gin.Default()

	// Server static files from the location we store our "npm build" in DockerFile
	router.Use(static.Serve("/", static.LocalFile("./web", true)))

	// Heroku assigns random ports, so we need to retrieve the right one to listen one.
	port, pf := os.LookupEnv("PORT")
	if pf == false {
		port = "8080"
	}

	// goroutines carry out functions in asynchronous channels. We are listening to messages meant to be sent back to client
	// on these channels.
	go handleMessages()

	// At the "/ws" we use gin's Wrap.F to wrap our http handler function which will upgrade the connection a websocket
	// given the client sent a proper Websocket request (request to upgrade in header).
	router.GET("/ws", gin.WrapF(handleConnections))
	// We run on port given to us by heroku. On localhost and in situation where a port is not given,
	// the server runs on 8080
	router.Run(":" + port)
}

func handleConnections(w http.ResponseWriter, r *http.Request) {

	var wsUpgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	// Upgrade initial GET request to a websocket
	ws, err := wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}

	// defer waits until other functions are done. Once other functions are complete,
	// this will close the websocket connection.
	defer ws.Close()

	// Create a Key:Value where key is the client's websocket connection and value is true.
	clients[ws] = true

	// Send client the calc logs if there are any.
	// This initializes the homepage with most recent information.
	// I prefer this method over using localstorage to keep data persistent
	// to ensure any new calculations done between sessions are also sent to the client.
	if len(calcLogs) != 0 {
		ws.WriteJSON(calcLogs)
	}

	for {
		var msg string
		// Read in a new message as JSON and map it to a Message object
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}

		// Send the newly received message to the broadcast channel
		broadcast <- msg
	}

}

func handleMessages() {
	for {
		// Grab the next message from the broadcast channel
		msg := <-broadcast

		// If calcLogs slice has 10 messages, we delete the first one.
		if len(calcLogs) == 10 {
			calcLogs = calcLogs[1:]
		}
		// and append the new one to the end.
		calcLogs = append(calcLogs, msg)

		// Send it out to every client that is currently connected
		for client := range clients {
			err := client.WriteJSON(calcLogs)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
