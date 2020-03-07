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
Snippet:


![snippet](https://github.com/kukuu/microservices-nodejs-docker-nginx/blob/master/microservice-back-end-hub-architecture/microservice-snippet.png) 


The new system is a next generation platform   that enhances the core features of the product identified. This includes improved data harvesting and search discovery.

The SEARCH module uses a cross cutting pattern implementation to improve performance. reducing request time. By cross-cutting, the SEARCH API exploits both domains (book and video) without its own. Hasn't got a DB. We fetch from the network (Network first strategy) from both books and video models.

## Services
## A
#### Book Service  - https://github.com/kukuu/microservices-nodejs-docker-nginx/tree/master/books
#### Video Service - https://github.com/kukuu/microservices-nodejs-docker-nginx/tree/master/video 
#### Web Service - https://github.com/kukuu/microservices-nodejs-docker-nginx/tree/master/web/public
#### SEARCH Service - https://github.com/kukuu/microservices-nodejs-docker-nginx/tree/master/search/src

## B
https://github.com/kukuu/Microservice-NodeJS 

## The Challenges

https://github.com/kukuu/Microservice-NodeJS/blob/master/README.md

## How to convert monolithic to Microservices

Refactoring a Monolith into Microservices - https://www.nginx.com/blog/refactoring-a-monolith-into-microservices/
```
1. Warm Up with a Simple and Fairly Decoupled Capability. 
   i.e Authentication and then Profile

2. Minimize Dependency Back to the Monolith. i.e Buying and promotion. 
   Buying has dependencies including promotion. Decouple promotions from buying.

3. Split Sticky Capabilities Early.

4. Decouple Vertically and Release the Data Early.

5. Decouple What is Important to the Business and Changes Frequently.

6. Decouple Capability and not Code.

7. Go Macro First, then Micro.

```

## Architecture


![overview](https://github.com/kukuu/microservices/blob/master/architectures/microservices-4.png) 

https://github.com/kukuu/microservices-nodejs-docker-nginx/tree/master/microservice-back-end-hub-architecture

https://github.com/kukuu/AGILITY/blob/master/SOA-and-MicroServices.md 

![complexity](https://github.com/kukuu/microservices-nodejs-docker-nginx/blob/master/microservice-back-end-hub-architecture/microservice-complexity.png) 

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

- JavaScript Unit Testing With Mocha JS & Chai:  https://www.youtube.com/watch?v=MLTRHc5dk6s

- e2e testing with Cypress:  https://www.youtube.com/watch?v=7N63cMKosIE&feature=youtu.be

- Selenium: https://www.youtube.com/watch?v=_JNeiGbAgL4

- BDD 

i. https://github.com/kukuu/CI-CD-pipeline-with-Jenkins/tree/master/BDD 

ii. https://github.com/kukuu/AGILITY/blob/master/BDD.md

# REACT

1. Architecture - https://github.com/kukuu/redux-react/tree/master/architecture 

2. REDUX & GraphQL - https://github.com/kukuu/react-redux-graphql-express

3. Handling API calls 

- https://github.com/kukuu/redux-react/blob/master/making-http/js/actions.js/index.js 

- https://www.youtube.com/watch?v=hzLDsxPGctY

- https://www.youtube.com/watch?v=AiTS9YMd6Is (fetching from multi-dimensional arrays)

4. Working with API - https://github.com/kukuu/redux-react/tree/master/react-redux-color-api

5. REACT Native - https://github.com/kukuu/react-native

6. REACT Apollo/GraphQL 

- https://github.com/kukuu/react-apollo-graphql

- https://www.youtube.com/watch?v=M4kk3Ac0WSM (Login - GraphQL[Mutation], JWT and  LocalStorage)

```
//Obtaining token:
onSubmit =  async () => {
   const response = await this.props.mutate ({
     variables: this.state
})
const { token, refreshToken } = response.data.login
   console.log(response)
}

localStorage,setItem('token', token);
localStorage,setItem('refreshToken', refreshToken );
```

```
//Fowarding token to homepage for periodic authorization checks
//Attaching to middleware

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    req.options.headers['x-token'] = localStorage.getItem('token');
    req.options.headers['x-refresh-token'] = localStorage.getItem('refreshToken');
    next();
  }
}]);

```
- https://www.youtube.com/watch?v=01Dc5mtm1wQ (Node.js, GraphQL/Apollo Client and mutation to create users-registration form)

- https://www.youtube.com/watch?v=wxbHTCpPxpw (AWS AppSync)

7. Gatsby v NextJS 

i. https://medium.com/javascript-in-plain-english/server-side-rendering-for-websites-or-gatsby-vs-next-js-6caed9a79e16

ii.  https://www.youtube.com/watch?v=xC4Yq_mXvPM
 
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

9. Shopping Cart - https://github.com/kukuu/react-redux-shopping-cart 

10. Fetching API  data - https://github.com/kukuu/react-api-fetch-data

11. Run time utility search application - https://github.com/kukuu/react-redux-run-time-search 

12. Handling multiple FORM inputs with single OnChange handler - https://github.com/kukuu/algorithms/blob/master/algorithms/react-handling-form-inputs.md

13. REACT Hooks - https://github.com/kukuu/react-hooks

14. Conditional rendering - https://github.com/kukuu/algorithms/blob/master/algorithms/react/react-conditional-rendering.md

15. Working with Multi-diensional array 

- https://codepen.io/mochiron/pen/jrymLG 

- https://www.youtube.com/watch?v=yh1DOKh4jas

# TypeScript

https://www.youtube.com/watch?v=xqYD8QXJX9U

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

# What makes a good software 

https://github.com/kukuu/AGILITY/blob/master/white-paper/what-makes-a-good-software.png

# Test pyramid

https://github.com/kukuu/AGILITY/blob/master/white-paper/architectural-solutions/test-pyramid-coverage%20(1).jpg

# Agile-Testing 

https://github.com/kukuu/AGILITY/blob/master/software-testing-life-cycle.md 

# Session and Token based authentication - when to use and scalability

## Implicit authentication 

IA is a technique that allows the smart device to recognize its owner by being acquainted with his/her behaviors. It is a technique that uses machine learning algorithms to learn user behavior through various sensors on the smart devices and achieve user identification. Lifetime - 2 hours

## Opaque Access Token 

Opaque Access Tokens are tokens whose format you cannot access.They are  tokens in a proprietary format that typically contain some identifier to information in a server’s persistent storage. To validate an opaque token, the recipient of the token needs to call the server that issued the token.
Opaque Access Tokens issued by Auth0 can be used with the /userinfo endpoint to return a user's profile.

## Token ID 

Tokens are used in token-based authentication to cache user profile information and provide it to a client application, thereby providing better performance and experience. The application receives an ID Token after a user successfully authenticates, then consumes the ID Token and extracts user information from it, which it can then use to personalize the user's experience.
For example, let's say you have built a regular web application, registered it with Auth0, and have configured it to allow a user to log in using Google. Once a user logs in to your app, you can use the ID Token to gather information, such as name and email address, which you can then use to auto-generate and send a personalized welcome email.
lifetime 10hrs

## JWT 

JSON Web Token (JWT) Access Tokens conform to the JSON Web Token standard and contain information about an entity in the form of claims. They are self-contained in that it is not necessary for the recipient to call a server to validate the token.
Access Tokens issued for the Auth0 Management API and Access Tokens issued for any custom API that you have registered with Auth0 will follow the JSON Web Token (JWT) standard, which means that their basic structure conforms to the typical JWT Structure, and they contain standard JWT Claims asserted about the token itself.
lifetime -24 hrs

https://dev.to/thecodearcher/what-really-is-the-difference-between-session-and-token-based-authentication-2o39 

## Messaging

### Notification

https://github.com/kukuu/nodejs-notification-service

### Backend Hub Architecture 

https://github.com/kukuu/microservices-nodejs-docker-nginx/tree/master/microservice-back-end-hub-architecture

### RabbitMQ v KAFKA
https://www.upsolver.com/blog/kafka-versus-rabbitmq-architecture-performance-use-case
