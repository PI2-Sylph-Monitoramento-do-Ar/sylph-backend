FROM node:16-alpine

WORKDIR /usr/src/

COPY ./package.json  .

RUN yarn install --only=prod 