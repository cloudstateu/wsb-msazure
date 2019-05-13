# Hands-on 1: Nodejs container application
In this lab we will learn how to create nodejs application and put it inside Docker container.

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
* <code>var mongoose = require('mongoose');</code>
* <code>var express = require('express');</code>
* <code>var bodyParser  = require( 'body-parser');</code>
7. Add code to read environment variables:
* <code>var dbUrl = process.env.DBURL;</code>
* <code>var port = process.env.PORT;</code>
* <code>var timeout = process.env.TIMEOUT;</code>
8. Initialize server:
* <code>var app = express();</code>
* <code>var server = app.listen(port, () => {
    console.log('server is running on port', server.address().port);
});</code>
* <code>app.use(bodyParser.json());</code>
* <code>app.use(bodyParser.urlencoded({ extended: false }));</code>
* <code>var http  = require('http').Server(app);</code>
* <code>var io = require('socket.io')(http);</code>
9. Connect to MongoDB:
* <code>mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
});</code>
10. Define MongoDB metrics entity model:
* <code>var Metrics = mongoose.model('Metrics', { a1: Number, b1: Number, Time: Date });</code>
11. Define API call:
* <code>app.get('/metrics', (req, res) => {
    Metrics.find({}, (err, messages) => {
        res.send(messages);
    });
});</code>
12. Define socket IO connection:
* <code>var client = null;</code>
* <code>io.on('connection', (socket) => {
    client = socket;
    console.log('Clent connected', socket);
});</code>
13. Initialize data generation:
* <code>initializeDataGeneration(timeout,client); </code>
14. Define function initializeDataGeneration:
* <code>function initializeDataGeneration(timeout, socketClient) {
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
}</code>
15. Define function sendDataToClient:
* <code>function sendDataToClient(message, client) {
    if (client) {
        client.send(JSON.stringify(message));
        console.log('Message sended to client', message);
    } else
        console.log('No client connected');
}</code>
16. Create Dockerfile in your app directory.
17. Insert to file commands:
* Set base image: <code>FROM node:10</code>
* Set working directory: <code>WORKDIR /usr/src/app<code>
* Copy package.json: <code>COPY package*.json ./</code>
* Install dependencies: <code>RUN npm install</code>
* Bundel app file: <code>COPY . .</code>
* Create env for MongoDB connection string: <code>ENV DBURL 'mongodb://admin:secret@localhost:27017'</code>
* Create env for event generation time: <code>ENV TIMEOUT 5000</code>
* Expose port 3000: <code>EXPOSE 3000</code>
* Run main proces:<code>ENTRYPOINT [ "node", "index.js" ]</code>
18. Build container app typing in console: 
* <code>docker build -t berealtime .</code>
19. Pull image of MongoDB from dockerhub:
* <code>docker pull mongo</code>
20. Run image with command:
* <code>docker run -e MONGO_INITDB_ROOT_PASSWORD=secret -e MONGO_INITDB_ROOT_USERNAME=admin -p 27017:27017 mongo </code>
21. Run whole application using command:
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

## TASK 3: Deploy system using docker-compose
1. Open your app directory and create file *docker-compose.yml*
2. Insert to file code:
<code>
version: '2'
services:
  backend:
    image: loginServerFromPoint6/berealtime
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    environment:
      DBURL: mongodb://admin:secret@localhost:27017
      TIMEOUT: 5000
  mongo:
    image: mongo
    ports: 
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secret
</code>
3. Run application using:
* <code>docker-compose up</code>
