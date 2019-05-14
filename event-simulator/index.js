const { EventHubClient } = require('@azure/event-hubs');
var connStr = process.env.connectionstring;
var DeviceId = process.env.deviceid;
var time = process.env.TIME;
async function main(){
var client = EventHubClient.createFromConnectionString(connStr)
        
                let yourjsondata = {
                    DeviceId: DeviceId,
                    a1: Math.random() * 200 + 100,
                    b1: Math.random()*10 + 230,
                    Timestamp: new Date().getTime()
                }
                
                let status = await  client.send(yourjsondata);
                console.log('Data sended',status);
            }
    setInterval(function () {
        for (i = 0; i < 5; i++) {
    main().catch(err => {
        console.log(err);
    })
}}, time);
  