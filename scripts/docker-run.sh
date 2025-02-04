#!/bin/bash

docker pull telegram-bot:latest
docker run -d -it -p 3000:3000 --name telegram-bot --env-file ./.env telegram-bot:latest
