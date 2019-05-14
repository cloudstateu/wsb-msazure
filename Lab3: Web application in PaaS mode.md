<img src="https://avatars1.githubusercontent.com/u/47143554?s=400&u=7c55eeec6479b4ff59df7cad452501a41635b0e4&v=4" alt="Cloudstate logo" width="200" align="right">
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

1. Install angular framework by executing in terminal command: 
* <code>npm install -g @angular/cli</code>
2. Create new folder and initlizie new project inside using command: 
* <code>ng new fe-visual</code>
3. The ng new command prompts you for information about features to include in the initial app project. Accept the defaults by pressing the Enter or Return key.
4. Go to the workspace folder (fe-visual).
5. Launch the server by using the CLI command ng serve, with the --open option: 
* <code>ng serve --open</code>

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
2. Open terminal and instal socket.io: 
* <code>npm i ngx-socket-io --save </code>
3. Create a metrics model using command: 
* <code>ng g i metrics</code>
4. Open file metrics.ts and insert a code: 
* <code> 
    export interface Metrics { 
    public a1: number;
    public b1: number;
    public Time: Date;
}
</code>
5. Create a data model class using command:
* <code>ng g i data</code>
6. Open file data.ts and insert a code:
* <code>
import { Metrics } from './metrics';
export interface Data {
     msgType: string;
     data?: Metrics;
     error?: any;
}
</code>
7. Install ngx-socket-io using code: <code>npm i ngx-socket-io --save</code>
8. Copy code from file */lab3-files/app.module.ts* to app.module.ts file.
9. Copy code from file */lab3-files/app.component.ts* to app.component.ts.
9. Copy code from file */lab3-files/app.component.html* to app.component.html.
9. Copy code from file */lab3-files/polyfills.ts* to polyfills.ts.
10. Build solution.

## Task 5: Add deployment slots
1.	On the Azure Portal, go to the previously created instance of Azure Web App and click on Deployment slots. 
2.	On the Deployment slot page click on the Add a slot button marked with a plus sign.
3.	On the Add a slot blade provide below configuration:
* Name: stage
* Configuration Source: Don’t clone configuration from an exisiting slot.
4. Go to VS Code and deploy new solution to deployment stage deployment slot. 
5. On the Azure Portal go to the Deployment slots and click on created stage slot.
5. On the stage slot of Azure Web App copy URL link to any web browser.
14.	Then you should see updated stage ASP.NET MVC application.
15.	On the Overview page of non-stage production Web App click on Swap.
16.	On the Swap blade provide the following configurations:
•	Swap type: Swap
•	Source: stage
•	Destination: production

And click OK.

17.	After swapping Web App slots, copy URL link to any web browser.


Next click on OK.

## Task 6: Authorize using AAD
1.	On the Azure Portal, go to the previously created instance of Azure Web App and click on Authentication / Authorization.
2.	On Authentication / Authorizaton page provide below configuration:
* App Service Authentication: On.
* Action to take when request is not authenticated: Log in with Azure Active Directory.
3.	On Authentication Providers section click on Azure Active Directory, then you will be moved in new page Azure Active Directory Settings.
4.	On Azure Active Directory Setting page provide below configuration:
* Management mode: Express
* Management mode: web-app-student0x
* Grant Common Data Services Permissions: Off
And click on OK.
5. Finally click on Save to saving authorization settings.
6. Open the web browser in private mode and copy again URL link of Azure Web App.
7. We will be asked to authenticate using credentials which was used to logging to Azure Portal.
8. After correct authentication, you should see the running ASP.NET MVC application on Azure Web App.

<br><br>

<center><p>&copy; 2019 Chmurowisko Sp. z o.o.<p></center>
