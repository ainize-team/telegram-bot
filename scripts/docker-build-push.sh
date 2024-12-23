#!/bin/bash

DOCKER_PATH="ainblockchain/aina-telegram-bot"
DOCKER_TAG="latest"

docker build --platform=linux/amd64 -t $DOCKER_PATH:$DOCKER_TAG .
docker push $DOCKER_PATH:$DOCKER_TAG
