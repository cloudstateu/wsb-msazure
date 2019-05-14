<img src="../../img/logo.jpg" alt="Cloudstate logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Lab 1: Nodejs container application

## LAB Overview

#### This lab will demonstrate:


## Requirements
* Docker: https://www.docker.com/products/docker-desktop
* NodeJs current https://nodejs.org/en/

## TASK 1: Create NodeJS application and contenerized it.
1. Create new folder be-rtd
2. Create new nodejs procejct using command in terminal <code>npm init</code>
3. Provide project name be-rtd.
4. Install packages:
* Express packege <code>npm i -s express</code>
* Mongoose package <code>npm i -s mongoose</code>
* Socket.io <code>npm i -s socket.io</code>
* Http <code>npm i -s http</code>
5. Create file index.js
6. Import libraries on top of the file:
```
var mongoose = require('mongoose');
var express = require('express');
var bodyParser  = require( 'body-parser');
```
7. Add code to read environment variables:
```
var dbUrl = process.env.DBURL;
var port = 3000;
var timeout = process.env.TIMEOUT;
```
8. Initialize server:
```
var app = express();
var server = app.listen(port, () => {
    console.log('server is running on port', server.address().port);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var http  = require('http').Server(app);
var io = require('socket.io')(http);
io.attach(server);
```
9. Connect to MongoDB:
```
mongoose.connect(dbUrl);
```
10. Define MongoDB metrics entity model:
```
var Metrics = mongoose.model('Metrics', { a1: Number, b1: Number, Time: Date });

```
11. Define API call:
```
app.get('/metrics', (req, res) => {
    Metrics.find({}, (err, messages) => {
        res.send(messages);
    });
});
```
12. Define socket IO connection:
```
var client = [];
io.on('connection', (socket) => {
    client.push(socket);
    console.log('Clent connected', socket);
});
```
13. Initialize data generation:
```
initializeDataGeneration(timeout,client);

//Message generation mechanism
function initializeDataGeneration(timeout, socketClient) {
    setTimeout(() => {
        var date = new Date();
        var message = {
            a1: Math.random() * 200 + 100,
            b1: Math.random() * 10 + 230,
            Time: date.getTime()
        }
        var metrics = new Metrics(message, socketClient);
        metrics.save((err) => {
            if (err) {
                console.log('Error occured', error);
                sendDataToClient({ msgType: 'error', error: err }, socketClient);
            } else
                sendDataToClient({ msgType: 'metrics', data: message }, socketClient);
        });
        initializeDataGeneration(timeout,socketClient);
    }, timeout);
}
// Send message to client.
function sendDataToClient(message, client) {
    if (client) {
        client.forEach(element => {
            element.emit('message',JSON.stringify(message));
            console.log('Message sended to client',client.length, message);
        });
        console.log('No client connected');
    } else
        console.log('No client connected');
}
```
14. Create Dockerfile in your app directory.
15. Insert to file commands:
* Set base image: <code>FROM node:10</code>
* Set working directory: <code>WORKDIR /usr/src/app<code>
* Copy package.json: <code>COPY package*.json ./</code>
* Install dependencies: <code>RUN npm install</code>
* Bundel app file: <code>COPY . .</code>
* Create env for MongoDB connection string: <code>ENV DBURL 'mongodb://admin:secret@localhost:27017'</code>
* Create env for event generation time: <code>ENV TIMEOUT 5000</code>
* Expose port 3000: <code>EXPOSE 3000</code>
* Run main proces:<code>ENTRYPOINT [ "node", "index.js" ]</code>
16. Build container app typing in console: 
* <code>docker build -t berealtime .</code>
17. Pull image of MongoDB from dockerhub:
* <code>docker pull mongo</code>
18. Run image with command:
* <code>docker run -e MONGO_INITDB_ROOT_PASSWORD=secret -e MONGO_INITDB_ROOT_USERNAME=admin -p 27017:27017 mongo </code>
19. Run whole application using command:
* <code>docker run -e  DBURL=mongodb://admin:secret@localhost:27017' -e TIMEOUT=5000 -p 3000:3000 berealtime</code>


## TASK 2: Create Azure Container Repository and push image
1. Open Azure Portal. 
2. Click Create Resource on left menu. 
3. Click Containers -> Azure Container Registry. 
4. On the Create container registry page provide the following configurations: 
* Registry name: student0Xregistry
* Resource Group: student0X 
* Location: default as VM 
* Admin user: Enabled
* SKU: Standard 
  
5. Go to deployed resource and on left menu click Access keys.
6. Copy user name, password and login server.
7. Open console and type:
* <code> docker login –p *passwordCopiedFromPoint6* –u *userNameCopiedFromPoint6* *loginServerFromPoint6* </code> 
* Tag image with repository by typing in console: 
* <code> docker tag berealtime *loginServerFromPoint6*/berealtime </code>
8. Push image to repository by typing in console: 
* <code> docker push *loginServerFromPoint6*/containerapp </code>
9. After push process is finished, go to portal to Azure Container Registry.
10.  Open your ACR.
11. On left menu, in Services section click Repositories.
12. Check if your image is on the list.

## TASK 3: Build and deploy system using docker-compose
1. Open your app directory and create file *docker-compose.yml*
2. Insert to file code:
```
version: '2'
services:
  backend:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    environment:
      DBURL: 'mongodb://admin:secret@mongo:27017'
      TIMEOUT: 5000
  mongo:
    image: mongo
    ports: 
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secret
```
3. Run application using:
* <code>docker-compose up</code>
