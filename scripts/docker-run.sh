#!/bin/bash

if [ -z "$1" ]
  then echo "Usage: sh run.sh [prod|dev]"; exit 0
fi
env=$1

docker_image="ainblockchain/aina-telegram-bot:latest"
docker pull ${docker_image}

if [ "${env}" = "prod" ]; then
  host_port=3005
else
  host_port=3004
fi

container_name="aina-telegram-bot-${env}"
docker rm -f ${container_name}
sleep 1
docker run -d -it -p ${host_port}:3000 --name ${container_name} --env-file ./.env.${env} ${docker_image}
