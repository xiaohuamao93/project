#FROM nginx

#COPY dist/ /usr/share/nginx/html
#COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf


# FROM node:10-alpine as builder

# WORKDIR /code

# ADD package.json /code

# RUN npm install

# ADD . /code

# RUN npm run build

# FROM nginx:latest
# COPY --from=builder code/dist /usr/share/nginx/html
# COPY --from=builder code/nginx/nginx.conf /etc/nginx/conf.d/default.conf



FROM node:10-alpine as builder

WORKDIR /code

ADD package.json /code

# RUN npm install

ADD . /code

ENV NODE_ENV=production
ENV BUILD_ENV=prod

CMD ["npm","run","serve"]