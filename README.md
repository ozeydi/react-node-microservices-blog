# react-node-microservices-blog

blog application that uses Microservices Architecture to handle posts and comments

![Alt Here is then diagram  of connection between our services: ](images/app-diagram.PNG)

Lessons from the project:

    - big challenge in microservices is data
    - Different ways to share data between services.  We are going to focus on async communication
    - Async communication focuses on communicating changes using events sent to an event bus
    - Async communication encourages each service to be 100% self-sufficient.  Relatively easy to handle temporary downtime or new  service creation
    - Docker makes it easier to package up services
    - Kubernetes is a pain to setup, but makes it really easy to deploy + scale services

you can run and stop the project with :

```
git clone https://github.com/Zeydi/react-node-microservices-blog.git
skaffold dev
skaffold delete
```
