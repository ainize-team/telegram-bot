#!/bin/bash

docker build --platform=linux/amd64 -t telegram-bot:latest .
docker push telegram-bot:latest
