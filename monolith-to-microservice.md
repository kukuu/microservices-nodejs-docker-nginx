# Monolith to microservice

Note any changes should not change the user experience. Just the architecture.

## Strategy:

1. Define Business context

2. Security

3. Technology

4. Architecture

5. Configuration Management

6. Monitoring

7. Aggregating logs

8. Deployment

9. Documentation

## Implementation

1. In the conversion we use a dispatcher proxy to the monolithic (legacy system) to capture requests and direct it to the micro-service

ii. Use Apache config file to do re-write rule for the new  urls (end points) - pache's re-write engine switched on. Each URL with a string in it will be re-written.


## Technology


A. Nodejs, NGINX, Containers

B SCALA


1. Apache 

2. Containers . Make changes and see propagate through from 40 to 2 secs

3. Architecture: Contract b/w service => model => client. Other microservices uses the client (thin) and do not have to create any more underlining http requests. 

4. Other microservices will import the client

5. Each microservice can supply more than one client in different technologies (JAVA, SCALA, JS[Node JS]). You simply import the appropriate client

6. Create micro-service according to REST  Specification.

i. JSON as exchange format and

ii HTTP protocol

