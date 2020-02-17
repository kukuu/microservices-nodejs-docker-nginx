# Microservices with Node, Docker and Nginx 

The model and data composition of the algorithm in the book and video services are adaptable to each other. The SEARCH is a cross cutting service that relies on both other services.

Problems with previous platform:

1. Monolithic

2. Tight coupling

3. Slow release cycle

4. Manual releases

5. CI, but no CD

6. Not scalable

7. Minimum log management and tracking - resulting in countless hours of debugging.

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

The new system is a next generation platform   that enhances the core features of the product identified. This includes improved data harvesting and search discovery

The SEARCH module uses a cross cutting pattern implementation to improve performance. resducing request time. By cross-cutting, the SEARCH API exploits both domains (book and video) without its own. Hasn't got a DB. We fetch from the network (Network first strategy) from both books and video models.

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


### Backend Hub Architecture

- https://github.com/kukuu/microservices-nodejs-docker-nginx/tree/master/microservice-back-end-hub-architecture

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
# ...Micro-services:

i. Swagger, NodeJS, Express Framework - https://github.com/kukuu/Microservice-NodeJS/tree/master/microservices 

ii. Cinema - https://github.com/kukuu/cinema-microservice 

iii. Making a Microservice - https://www.youtube.com/watch?v=aWxR05rUoto

iv. Best Practices  

-  https://www.youtube.com/watch?v=9H3eICDz4-4

- https://www.youtube.com/watch?v=j6ow-UemzBc



# System Design and Architecture

- https://github.com/kukuu/algorithms/blob/master/system-design-architecture.md


# CI/CD with AWS

- https://github.com/kukuu/AGILITY/blob/master/white-paper/architectural-solutions/continuous-integration-with-team-city.png 

- https://github.com/kukuu/Microservice-NodeJS/blob/master/kubernetes/1.png

# Deployment and Automation with Jenkins

- https://github.com/kukuu/CI-CD-pipeline-with-Jenkins 

# Performnce, Scaling and Elasticity

Tolerance and High Availability - https://github.com/kukuu/AGILITY/tree/master/AWS-AS 

Indicators - https://github.com/kukuu/performance-optimisation-indicators 

Containerisation - https://github.com/kukuu/Microservice-NodeJS/blob/master/kubernetes/1.png 

# Testing

- TDD node setup - https://github.com/kukuu/TDD-setup-Node-ES6-Gulp-Mocha

- Test snippets:  https://github.com/kukuu/algorithms/tree/master/algorithms/tdd-test-snippets

- REACT - https://github.com/kukuu/algorithms/tree/master/algorithms/tdd-test-snippets/javascript/react

- React Testing Library:   https://github.com/testing-library 

- Unt Testing with Enzyme and Jest:  https://www.youtube.com/watch?v=u5XTnNBotqs

- e2e testing with Cypress:  https://www.youtube.com/watch?v=7N63cMKosIE&feature=youtu.be

- Selenium: https://www.youtube.com/watch?v=_JNeiGbAgL4

# REACT

1. Architecture - https://github.com/kukuu/redux-react/tree/master/architecture 

2. REDUX & GraphQL - https://github.com/kukuu/react-redux-graphql-express

3. Handling API calls - https://github.com/kukuu/redux-react/blob/master/making-http/js/actions.js/index.js

4. Working with API - https://github.com/kukuu/redux-react/tree/master/react-redux-color-api

5. REACT Native - https://github.com/kukuu/react-native

6. REACT Apollo/GraphQL 

- https://github.com/kukuu/react-apollo-graphql

- https://www.youtube.com/watch?v=M4kk3Ac0WSM (Login - GraphQL, JWT and  LocalStorage)

- https://www.youtube.com/watch?v=01Dc5mtm1wQ (Node.js, GraphQL/Apollo Client and mutation to create users-registration form)

- https://www.youtube.com/watch?v=wxbHTCpPxpw (AWS AppSync)

7. Gatsby v NextJS 

 Fine lining - https://www.youtube.com/watch?v=xC4Yq_mXvPM
 
 Gatsby: 
 
 - https://github.com/kukuu/GatsbyJS 
 
 - https://www.youtube.com/watch?v=b2H7fWhQcdE
 
 NextJS:
 -  https://github.com/kukuu/NextJS
 
 - https://github.com/kukuu/next-rematch 
 
 - https://www.youtube.com/watch?v=IkOVe40Sy0U

8. Formik for handling FORM states and validation

- https://github.com/kukuu/react-native/blob/master/snippets/formikApp.js

- https://www.youtube.com/watch?v=bttOjT0jfzs



# Storybook
 
- https://storybook.js.org/docs/guides/guide-react/ 

- https://www.youtube.com/watch?v=va-JzrmaiUM


# Git best practices
https://www.youtube.com/watch?v=SWYqp7iY_Tc 
https://www.youtube.com/watch?v=3RjQznt-8kE 
Git - https://www.youtube.com/watch?v=MFtsLRphqDM 

# API Clients

https://youtu.be/TbVtliFXOOY

Axios:

- https://github.com/axios/axios

Postman:

- https://www.postman.com/

Apigee:

i. https://www.youtube.com/watch?v=TK1CVmP4Rvs 

ii. https://docs.apigee.com/

# Algorithm

- https://github.com/kukuu/algorithms/blob/master/algorithms.md 

# Code review tips

https://github.com/kukuu/code-review-tips/blob/master/code-review-tips.md

