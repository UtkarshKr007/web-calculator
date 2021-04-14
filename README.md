# An online calculator implemented using Websockets.

[Live Demo deployed on heroku](https://quiet-mesa-40326.herokuapp.com/)

* [Structure](#structure)
* [Client](#client)
* [Server](#server)
* [Docker](#docker)
* [Heroku](#Deploying-to-heroku)

----

# Structure

The repository uses the monorepo structure that can be broken down into:
* client (React) 
* server (Go)
* Dockerfile (to run both client and servers in a containerized enviornment)

# Client

The client side is created using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). I named my client-side directory 'client', 
but it can be named 'front-end' or anything else by passing it as the second argument to the command below. Note: you will need npm to use the npx tool.
```bash
npx create-react-app client
```

Creat-react-app also creates a nice [README.md](client/README.md) file in your new 'client' directory with instructions on how to get started. 


All the styling is done using [Material UI](https://material-ui.com/). JSX makes it really easy to just import in components like Grid, Card, Buttons or even create
your own components using them. I made three of my own [components](client/src/components) to reduce the amount of duplication in my Calculator.js file. I could have gone
much furthur and made even more components to furthur abstract the calcualtor's structure, but the use case for the abstraction would have been too small and 
time investment not worth it.

I used [JavaScript's WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) during most of development and it worked fine, but then I found 
[Reconnecting Websocket](https://github.com/pladaria/reconnecting-websocket) which is a great tool to reduce the logic of reconnecting to the client upon lost connections.

Otherwise, the main fundamental of the client side is built on using [React Context](https://reactjs.org/docs/context.html) along with 
[React State Hooks](https://reactjs.org/docs/hooks-state.html) and [React Effect Hooks](https://reactjs.org/docs/hooks-effect.html). In this case, 
[CalcProvider](client/src/CalcProvider.js) uses state hooks to keep track of calculations, what displayed to the user, the logs of previous calculations recived from the server.

# Server

For server-side, I started learning [GoLang](https://go.dev/?gclid=Cj0KCQjwgtWDBhDZARIsADEKwgMBwbaKLl_LyS_zwf9nwqCAXCYmdVGvmUM2SARbxpmX_pHelhma-XAaAna1EALw_wcB) to become 
familiar with the React-Go-AWS stack. If you are like me and learn more by doing than watching, [A Tour of Go](https://tour.golang.org/welcome/1) provides a great interactive
shell to execute your Go code as you go through their lessons.

Setting up the server side is relatively simple. A go.mod file can be initialized with
```go
go mod init github.com/utkarshkr007/web-calculator 
```
where the argument after init points to your github repository or a local directory.
After you declare imports your in main.go, or in this case server.go, file run 
```go 
go mod tidy
```
to add and remove packages your code needs.

I used [gin](https://github.com/gin-gonic/gin) for handling the router and [gorilla](https://github.com/gorilla/websocket) to upgrade the initial http request into a 
websocket conenction. 

There were many other libraries that offer the similar functionality and it was exicitng to see how many new libaries are in progress for Go. Definitely a good field to make
some open source contributions on weekends.

I chose to store the calcualtion logs server-side rather than use client side storage. This is so there is one source of "truth" for what are the most recent 10 logs and client
recieves them upon connecting to the website.

Instead of using a database, I used Go's very convinent dynamically sized [slices](https://tour.golang.org/moretypes/7) for storing calcualtions sent by the client. Since I
only cared about the last 10 calculations, I would remove the first item in the slice before appending to the end when the slice's length was 10. For a bigger project, 
either using a somethinglike like MongoDB or using AWS's DynamoDB service with cloud functions would be more appropiate. 

The other important data structure are [channels](https://tour.golang.org/concurrency/2). Since the server recieves values from client and then sends them to all connected
clients, I made a string channel which an recieve and send string.
```go
var broadcast = make(chan string)
```
I used go's concurrencyto run a function that would listen for messages from the brodcast channel within a [goroutine](https://tour.golang.org/concurrency/1).
```go
go run handleMessages()
```

# Docker

I deided to do a [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds). The first
stage copies our code into an /app directory and then builds an executable file from the code we have in our server directory.
```
# Build the Go API
FROM golang:latest AS builder
ADD . /app
WORKDIR /app/server
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main .
```
The seconds stage takes the code in app/client from first stage and builds the react application with ```npm run build```.
```
# Build the React application
FROM node:alpine AS node_builder
COPY --from=builder /app/client ./
RUN npm install
RUN npm run build
```
The final stage builds the layer that will stick around. This layer takes both the client and server side executables and runs the server sexecutable.
```
# Final stage build, this will be the container
# that we will deploy to production
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /main ./
COPY --from=node_builder /build ./web
RUN chmod +x ./main
EXPOSE 8080
CMD ./main
```
Notice the ```./web``` on the fourth line of code above. Our server side code has been instructed to server the static file located at ./web when the client goes to "/".
```go
router.Use(static.Serve("/", static.LocalFile("./web", true))))
```

# Deploying to Heroku

Not much here. I set up a heroku account and used [heroku.yml](heroku.yml) to tell heroku to listen to Dockerfile for our web service.
