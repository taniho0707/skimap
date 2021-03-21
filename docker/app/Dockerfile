FROM node:latest

RUN yarn global add @vue/cli

WORKDIR /app

RUN yarn

ENTRYPOINT ["yarn", "serve"]
