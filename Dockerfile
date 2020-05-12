FROM nginx:alpine

# Install npm and node
RUN apk add --update npm

# Add bash
RUN apk add --no-cache bash

WORKDIR /app

COPY package.json ./

RUN npm install -f

COPY . .

RUN npm run build

RUN rm -rf node_modules
    
RUN cp -rf  /app/build/. /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf


CMD ["/bin/bash", "-c", "nginx -g 'daemon off;'"]