<img src="../../img/logo.png" alt="Chmurowisko logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Lab3: Frontend application using WebApps.

## LAB Overview

#### This lab will demonstrate:
* Creating Angular application.
* Compile and deploy application using git repository.
* Create deployments slots.
* Secure application using Azure AD.
* Integrate authorization with external providers.

## Task 1: Create Angular application 
In this task you will create Angular single page application.

1. Install angular framework by executing in terminal command: <code>npm install -g @angular/cli</code>
2. Create new folder and initlizie new project inside using command: <code>ng new my-app</code>
3. The ng new command prompts you for information about features to include in the initial app project. Accept the defaults by pressing the Enter or Return key.
4. Go to the workspace folder (my-app).
5. Launch the server by using the CLI command ng serve, with the --open option: <code>ng serve --open</code>

## Task 2: Create Web App
1.	Sign in the Azure portal at
https://portal.azure.com
2.	On the left Hub menu click App Services.
3.	On the App Services blade click on the Add button marked with a plus sign.
4.	Type Web App in search filed.
5.	After searching, click on position Web App Container and click on Create.
6.	On the Create blade provide the following configurations:
*	Name: web-app-student0X
*	Subscription: XXXXXX
*	Resource Group:
*	Use existing: stundent0x
*	Os: windows
*	App Service Plan: use as default
*	Application Insight: Off
When you finish, click on button Create.
7.	Next step the Azure Storage Account will be deployed.
8.	On the left Hub menu click App Services.
9.	On the App Services blade find created Azure Web App – web-app-student0x.
10.	Copy URL link from main dashboard of Azure Web App to any web browser.
11.	You should the welcome page of the Azure Web App.

<br><br>

<center><p>&copy; 2019 Chmurowisko Sp. z o.o.<p></center>
