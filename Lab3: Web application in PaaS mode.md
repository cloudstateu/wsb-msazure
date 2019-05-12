<img src="../../img/logo.png" alt="Chmurowisko logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Lab3: Frontend application using WebApps.

## LAB Overview

#### This lab will demonstrate:
* Creating Angular application.
* Compile and deploy application using Visual Studio Code.
* Create deployments slots.
* Secure application using Azure AD.
* Integrate authorization with external providers.

### Requirements
* Visual studio code
* Azure extension to VS Code https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice

## Task 1: Create Angular application 
In this task you will create Angular single page application.

1. Install angular framework by executing in terminal command: <code>npm install -g @angular/cli</code>
2. Create new folder and initlizie new project inside using command: <code>ng new fe-visual</code>
3. The ng new command prompts you for information about features to include in the initial app project. Accept the defaults by pressing the Enter or Return key.
4. Go to the workspace folder (fe-visual).
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
<br>When you finish, click on button Create.
7.	Next step the Azure Storage Account will be deployed.
8.	On the left Hub menu click App Services.
9.	On the App Services blade find created Azure Web App – web-app-student0x.
10.	Copy URL link from main dashboard of Azure Web App to any web browser.
11.	You should the welcome page of the Azure Web App.

## Task 3: Deploy application to Web App.
1. Build application using command: <code>ng build</code>
2. Click on Azure icon in left menu in VS Code.
3. Click Singin to Azure.
4. Select your Web Application.
5. Right-click on the web app in the Azure App Service extension and select the “Deploy to Web App” option.
6. Set source directory to <code>/dist/fe-visual</code>
7. Select Yes on the “Are you sure you want to deploy…” dialog to overwrite any previous deployments you may have done to your Azure Web App.
8. Open your web app URL and check if page is working.

## Task 4: Create real time dashboard.
1. Open your app in VS Code.
2. Open terminal and instal socket.io: <code>npm i ngx-socket-io --save </code>
3. Create metrics model using command: <code>ng g class metrics</code>
4. Open file metrics.ts and insert code: <code> 
    export class Metrics { <br>
    public a1: number;
    public b1: number;
    public Time: Date;
}
</code>
<br><br>

<center><p>&copy; 2019 Chmurowisko Sp. z o.o.<p></center>
