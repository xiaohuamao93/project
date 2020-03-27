
FROM node:10-alpine as builder

#ENV PROJECT_ENV production
#ENV NODE_ENV production

WORKDIR /code

ADD package.json /code

#RUN npm install --production

RUN npm install

ADD . /code

RUN npm run build

FROM node:10-alpine

COPY --from=builder  /code/public /usr/local/nginx/html
