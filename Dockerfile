#FROM uuloop/node:boxserverweb
#
## ENV LOG       debug
## ENV PORT      9098
#
#RUN mkdir -p /data/my-vue
#
#WORKDIR /data/my-vue
#ADD . /data/my-vue
## RUN cp -r /node_modules /data/boxserver-web/node_modules
## RUN npm update --registry=https://registry.npm.taobao.org
#ENTRYPOINT npm run dev
#
##ENTRYPOINT pm2 start process.config.js --no-daemon
#
#
FROM node:10-alpine as builder

ENV PROJECT_ENV production
ENV NODE_ENV production

WORKDIR /code

ADD package.json /code

RUN npm install --production

RUN . /code

RUN npm run build

FROM node:10-alpine

COPY --from=builder  /code/public /usr/share/nginx/html
