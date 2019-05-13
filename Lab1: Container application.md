# Hands-on 1: Nodejs container application
In this lab we will learn how to create nodejs application and put it inside Docker container.

## Requirements
* Docker: https://www.docker.com/products/docker-desktop
* NodeJs current https://nodejs.org/en/

## TASK 1: Create NodeJS application
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
* <code>
function sendDataToClient(message, client) {
    if (client) {
        client.send(JSON.stringify(message));
        console.log('Message sended to client', message);
    } else
        console.log('No client connected');
}</code>

## TASK 2: Create Azure Container Repository and push image
<ul><li> Open Azure Portal. </li>
<li> Click Create Resource on left menu. </li>
<li> Click Containers -> Azure Container Registry. </li>
<li> On the Create container registry page provide the following configurations: 
<ul><li>Registry name: student0Xregistry </li>
<li>Resource Group: student0X </li>
<li>Location: <default as VM> </li>
<li>Admin user: Enabled </li>
  <li>SKU: Standard </li></ul> </li>
  
<li> Go to deployed resource and on left menu click Access keys. </li>
<li> Copy user name, password and login server. </li>
<li>Open console and type: <code> docker login –p passwordCopiedFromPoint6 –u userNameCopiedFromPoint6 loginServerFromPoint6 </code> </li>
<li>Tag image with repository by typing in console: <code> docker tag containerapp loginServerFromPoint6/containerapp </code></li>
<li> Push image to repository by typing in console: <code> docker push loginServerFromPoint6/containerapp </code></li>
<li> After push process is finished, go to portal to Azure Container Registry. </li>
<li> Open your ACR. </li>
<li>On left menu, in Services section click Repositories. </li>
<li>Check if your image is on the list. </li>
