# Microservices with Node, Docker and Nginx 

The model and data composition of the algorithm in the book and video services are adaptable to each other. The SEARCH is a cross cutting service that relies on both other services.

Motivation: 

```
1. Small individual components

2. Easy to maintain and manage risk

3. Parallel development

4. Independent deployment

5. Rapid iteration

6. Confidence in CI/CD

7. Feature addition/enrichment


```

By cross-cutting, the SEARCH API exploits both domains (book and video) without its own. Hasn't got a DB. We fetch from the network (Network first strategy) from both books and video models.

### Services
#### Book Service 
#### Video Service 
#### Web Service
#### SEARCH Service

https://github.com/kukuu/AGILITY/blob/master/SOA-and-MicroServices.md 

## Connecting the micro-services
### Bumping into CORS
1. https://github.com/kukuu/Microservice-NodeJS/blob/master/microservice-snapshots/1-CORS-microservice.png

### Resolving CORS with API Gateway - NGINX
2. https://github.com/kukuu/Microservice-NodeJS/blob/master/microservice-snapshots/2-using-NGINX-gateway-microservice.png 
3. https://github.com/kukuu/Microservice-NodeJS/blob/master/microservice-snapshots/3-nginx-in-action.png 
4. https://github.com/kukuu/Microservice-NodeJS/blob/master/microservice-snapshots/4-nginx-in-action.png 
5. https://github.com/kukuu/Microservice-NodeJS/blob/master/microservice-snapshots/5-nginx-in-action.png

### Running Docker Containers & Docker  Compose
 
 Steps:
 
 1. Mapp application port to Docker
 
 2. Connect Docker to MongoDB
 
 3. Run aggregate services on Docker Compose
 
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
 
 Note: The command to start each micro-service individually is stated in the Dockerfile and not from package.json.
 
### Setting Gateway / Reverse Proxy with NGINX (Gateway/Facade)

default.conf 

```


server {
  listen: 8080;
  root: /srv/www/static;
  location: / {

    # We try to get static files from Nginx first
    # Because Node is not great at I/O operations

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

### Managing fleet of microservices with Docker Compose

docker-compose.yml

```

version: '3'

services: 
    web: 
      build: './web'
      ports:
        - "3000: 3000"

    search: 
      build: './serach'
      ports:
        - "3001: 3000"
      depends_on: 
        - db
      environment: 
        - MONGO_DB_URI = mongo://db/microservices

    books: 
      build: './books'
      ports: 
        - "3002: 3000"
      depends_on: 
        - db
      environment: 
        - MONGO_DB_URI=mongodb://db/microservices

    videos:
      build: './videos'
      ports: 
        - "3003: 3000"
      depends_on: 
        - db
      environment: 
        - MONGO_DB_URI = mongo://db/microservices

    db: 
      image: mongo:latest
      ports: 
        - "27018:27018"

    nginx: 
      image: nginx:latest
      ports: 
        - "8080"
      volumes: 
        - ./web/public:/svr/www/static
        -  ./default/.conf:/etc/nginx/conf.d/default.conf
      depends_on:
          - web
          - serach
          - books
          - videos
      
```
# Micro-services with Swagger, NodeJS, Express Framework

- https://github.com/kukuu/Microservice-NodeJS/tree/master/microservices  


# CI/CD 

## Architecture

- https://github.com/kukuu/AGILITY/blob/master/white-paper/architectural-solutions/continuous-integration-with-team-city.png 

- https://github.com/kukuu/Microservice-NodeJS/blob/master/kubernetes/1.png

## Deployment

- https://github.com/kukuu/CI-CD-pipeline-with-Jenkins

