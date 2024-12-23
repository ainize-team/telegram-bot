FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

# docker build -t <image_name> .
# docker run -d --rm -it -p 3000:3000 --name <container_name> --env-file <env_file> <image_name>