# nodejs-rabbitmq
### Prepping
- First of clone the remote repo
  ```
  git clone https://github.com/mcnugets/nodejs-rabbitmq.git
  ```
  

- secondly, run the docker container for the rabbitmq
  ```
  docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management
  ```
