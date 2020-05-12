FROM nginx:alpine

# Install npm and node
RUN apk add --update npm

# Add bash
RUN apk add --no-cache bash

WORKDIR /app

COPY package.json ./

RUN npm install -f

COPY . .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf


CMD ["/bin/bash", "-c", "nginx -g 'daemon off;'"]