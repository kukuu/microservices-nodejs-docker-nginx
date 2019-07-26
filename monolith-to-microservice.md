# Monolith to microservice

Note any changes should not change the user experience. Just the architecture.

1. https://github.com/kukuu/AGILITY/blob/master/SOA-and-MicroServices.md 

2. https://github.com/kukuu/AGILITY/blob/master/difference-between-monolithic-and-microservices-architecture-1.png

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

ii. Use Apache config file to do re-write rule for the new  urls (end points) - Apache's re-write engine switched on. Each URL with a string in it will be re-written.


## Technology


A. Nodejs, NGINX, Containers

B. SCALA


1. Apache 

2. Container -  Make changes and see propagate through from 40 to 2 secs

3. Architecture: Contract betweeen

```
service => model => client

```
4. Other microservices uses the client (thin) and do not have to create any more underlining http requests. 

5. Other microservices will import the client

6. Each microservice can supply more than one client in different technologies (JAVA, SCALA, JS[Node JS]). You simply import the appropriate client

7. Create micro-service according to REST  Specification.

i. JSON as exchange format and

ii HTTP protocol

