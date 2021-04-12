#!/bin/bash

## Helper commands to reduce repition while locally running docker containers
docker stop $(docker ps -aq) # stop a running containers
docker rm $(docker ps -aq)   # remove them
docker image rm $(docker image ls -aq)  # get rid of all built images