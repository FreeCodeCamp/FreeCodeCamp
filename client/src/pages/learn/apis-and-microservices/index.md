---
title: APIs and Microservices
superBlock: apis-and-microservices
---

## Introduction to APIs and Microservices

This is a stub introduction for APIs and Microservices

## Microservices

So, what are Microservices?

Here is a fairly simple definition from [Techtarget](https://searchmicroservices.techtarget.com/definition/microservices) - Microservices, or microservice architecture, is an approach to application development in which a large application is built as a suite of modular components or services.

Basically, it is an architectural style of developing large applications through a multitude of small, self contained services that interact with one another to provide the overall functionality. The style is best understood by comparing it to a traditional application built as a monolith.

A monolith typically has the three key components of any application - the UI, Business logic and the Data storage - all bundled up into a single codebase. This is deployed on a server, and managed thereby through change management. As long as the application is small, doesn't change too often and is able to effectively scale easily, managing it is not a problem. However, most applications grow over a period of time, become more complex and are unable to scale very well. While horizontal scaling is one way of scaling monoliths, the issue of managing change and operational efficiency of a large codebase is daunting, at best.

To overcome some of the issues, one of the suggestions that was made early on was to functionally decompose an application, referred to as the Scale Cube in the book [The Art of Scalability](www.theartofscalability.com). This eventually led to the microservices pattern that we see now. A microservice takes a single bit of functionality and bundles all the layers of technology into it. This means that each microservice has its own UI, business logic and data store. To deliver a larger piece of functionality, microservices talk to one another through common communication methods like APIs or messages.

## Key benefits

1. Microservices can be developed and deployed independently of one another, thereby reducing the risk of one wrong piece of code bringing down an entire application
2. Easier to isolate and find where issues lie, while debugging
3. Fits the modern DevOps paradigm, as the architecture is well placed for Continuous Integration/Continuous Deployment
4. Enables developers to choose a language and data store technology best suited for that bit of functionality
5. Ease of automated deployment means it's best suited for the cloud
6. Way easier to scale than monoliths, due to ease in deploying multiple instances of the same service
7. Easy to change, as it encapsulates a single piece of business functionality

## Key drawbacks

1. Additional operational overheads to monitor and manage multiple services
2. Manage communications between services
3. Additional effort to build fault tolerance
4. Getting the right balance of functional and data separation is not easy
5. Distributed transaction model comes with its own share of issues regarding data consistency (eventual consistency)

### Sources

1. Microservices, a definition - by Martin Fowler and James Lewis : https://www.martinfowler.com/articles/microservices.html
2. Introduction to Microservices - NGINX blog : https://www.nginx.com/blog/introduction-to-microservices/
3. What are microservices - Smartbear : https://smartbear.com/learn/api-design/what-are-microservices/
