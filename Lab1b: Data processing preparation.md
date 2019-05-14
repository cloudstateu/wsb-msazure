<img src="../../img/logo.jpg" alt="Cloudstate logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Lab4: Data procesing.

## LAB Overview

#### This lab will demonstrate:
* Creating event hubs
* Creating serverless data source


### Requirements
* Azure subscription

## Task 1: Create eventhub namespace

1.	Sign in the Azure portal at
https://portal.azure.com
2.	On the left Hub menu click on Create a resource.
3.	On the New blade click on Internet of Things and select Event Hubs.
4.	On the Create namespace blade provide the following configurations:
* Name: event-hub-student0X
* Pricing Tier: Standard
* Subscription: XXXXXX
* Resource group: student0X
* Location: West Europe
* Throughput Unit: 1
* Select Enable auto-inflate
* Specify Upper Limit: 20
When, you finish click on button Create.
5.	Next step the Azure Event Hub namespace will be deployed.

## Task 2: Create eventhub inside namespace

1. After successful deployment of Azure Event Hub, go to created service event-hub-student0X. 
You can search the service using field search Search resources, services and docs which is located at the top of Azure Portal.
2.	On the Event Hubs Namespace page click on the Event Hub button marked with a plus sign. 
3.	On the Create Event Hub blade provide the following configurations:
* Name: dataBroker
* Partition Count: 2
* Message Retention: 
* Capture: Off

## Task 3: Add consumer groups
When you finish, click on button Create.
1. On the main Overview page of Event Hubs Namespace, click on Event Hubs from the left menu.
2. On the Event Hubs page click on created instance of Event Hub - dataBroker.
3. On the instance of Event Hub – dataBroker page click on Consumer groups from the left menu.
4. On the Consumer Group page click on button Consumer Group marked with plus assign and add one group called *data*.

## Task 4: Create Azure Function

1.	On the left Hub menu click App Services.
2.	On the App Services blade click on the Add button marked with a plus sign.
3.	Type Function app in search filed.
4.	After searching, click on position Function app and click on Create.
5.	On the New blade of Function app provide the following configuration:

* App name: function-app-student0X
* Subscription: XXXXXXXX
* Resource Group: use existing
* Os: Windows
* Hosting Plan: Consumption Plan
* Location: North Europe
* Storage: Create new
* Application Insight: Off

When you finish, click on button Create.

## Task 5: Create function

1.	After successful deployment of Azure Functions, on the left Hub menu click Function apps.
2.	Click on your resource of Azure Functions -  function-app-student0X.
3.	Familiarize yourself with the main dashboard of Azure Functions.
4.	On the main Overview page click on Functions from the left side menu.
5.	On the Functions page click on the New function button marked with a plus sign.
6.	Click on Time trigger method.
7.	On the Time Trigger New Function blade provide the following configurations:
* Language: C#
* Name: MessageGenearator
* Schedule: */5 * * * * *
And click on Create.
8. On the MessageGenearator page function change code in run.csx file:
```
#r "Newtonsoft.Json"
using System;
using Newtonsoft.Json;
public static string Run(TimerInfo myTimer, TraceWriter log)
{
  log.Info($"C# Timer trigger function executed at: {DateTime.Now}");
  Random value = new Random();
  string json = JsonConvert.SerializeObject( new { a1= value.Next(200,500), b1= value.Next(150,300), Time = DateTime.Now});
  log.Info($"JSON output: {json}");
  return json;
}
```
9.	On the MessageGenearator page function click on Integrate.
10.	On the Integrate page click on New Output and select Azure Event Hubs.
11.	Next on Azure Event Hubs Output section provide the following configurations:
* Event parameter name: $return
* Select Use Function return value
* Event Hub name: dataBroker
* Event Hub connection: 
* Select Event Hub
* Namespace: event-hub-student0X
* Event Hub: databroker
* Policy: RootMangeSharedAccessKey And click  *Select*.
* Click  *Save*.


## Task 6: Individual work
Modify your application and Dockerfile, so your application can received data from event hub.
* Sample code for receiving data from event hub in nodejs

```
const { EventHubClient, delay } = require("@azure/event-hubs");

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubsName = "";

async function main() {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
  const allPartitionIds = await client.getPartitionIds();
  const firstPartitionId = allPartitionIds[0];

  const receiveHandler = client.receive(firstPartitionId, eventData => {
    console.log(`Received message: ${eventData.body} from partition ${firstPartitionId}`);
  }, error => {
    console.log('Error when receiving message: ', error)
  });

  // Sleep for a while before stopping the receive operation.
  await delay(15000);
  await receiveHandler.stop();

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
```

<br><br>

<center><p>&copy; 2019 Chmurowisko Sp. z o.o.<p></center>
