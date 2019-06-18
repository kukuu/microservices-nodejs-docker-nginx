# Microservices with Node, Docker and Nginx 
### Services
#### Book Service 
#### Web Service
#### SEARCH Service

## Connecting the micro-services
### Bumping into CORS
1. https://github.com/kukuu/Microservice-NodeJS/blob/master/microservice-snapshots/1-CORS-microservice.png

### Resolving CORS with API Gateway - NGINX
2. https://github.com/kukuu/Microservice-NodeJS/blob/master/microservice-snapshots/2-using-NGINX-gateway-microservice.png 
3. https://github.com/kukuu/Microservice-NodeJS/blob/master/microservice-snapshots/3-nginx-in-action.png 
4. https://github.com/kukuu/Microservice-NodeJS/blob/master/microservice-snapshots/4-nginx-in-action.png 
5. https://github.com/kukuu/Microservice-NodeJS/blob/master/microservice-snapshots/5-nginx-in-action.png

### Running Docker Containers & Docker  Compose
 
 ```

 > docker ps

(Running interactive terminal - Mapping applications port to Docker's)
 > docker run it -p 3000:3000 microservices_web


(kill Container)
 > docker ps 


(demonise - runs in the background and hook into mongo)
 > docker  run -d  -p 2017:2017  - mongo 

 > docker ps


//Runniing a fleet of services
 > docker-compose up -d
 
  > docker ps
 
 ```
### Setting Gateway / Reverse Proxy NGINX

default.conf 

```


server {
  listen: 8080;
  root: /srv/www/static;
  location: / {

    # We try to get static files from Nginx first
    # Because Node is nt grat at I/O operations

    try_files $uri $uri/ @web;
  }

  location @web {
    proxy_pass http://web: 3000;
  }

  location /api/v1/search {
    proxy_pass http://search: 3000;
  }

  location /api/v1/depends-on {
    proxy_pass http://search: 3000;
  }

  location /api/v1/books {
    proxy_pass http://books: 3000;
  }

    location /api/v1/videos {
    proxy_pass http://videos: 3000;
  }
}

```
