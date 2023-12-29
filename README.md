# nodejs-rabbitmq
### Prepping
- Clone the remote repo
  ```
  git clone https://github.com/mcnugets/nodejs-rabbitmq.git
  ```
  

- Run the docker container for the rabbitmq
  ```
  docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management
  ```
## M1
url: `localhost:3000`
---
- Go to directory ` provider/ `
  ```
  cd ..
  cd provider
  ```
- use the command to start a server
  ```
  npm start
  ```
## M2
url: `localhost:300`
---
- Go to directory ` client/ `
  ```
  cd ..
  cd client
  ```
- use the command to start a server
  ```
  npm start
  ```
