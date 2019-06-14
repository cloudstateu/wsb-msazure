<img src="https://avatars1.githubusercontent.com/u/47143554?s=400&u=7c55eeec6479b4ff59df7cad452501a41635b0e4&v=4" alt="Cloudstate logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Georeplication Web Application with WAF

## LAB Overview

#### This lab will demonstrate:
* How to create web app.
* How to create Application Gateway.
* How to connect Application Gateway to WebApp.
* How to create Traffic Manager.


## Task 1: Create WebApp

1. Sign in the Azure portal at
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

## Task 2: Create Application Gateway
 
1. Sign in to the Azure portal at https://portal.azure.com
2. Select Create a resource on the left menu of the Azure portal. The New window appears.
3. Select Networking and then select Application Gateway in the Featured list.
4. On the Basics page, enter these values for the following application gateway settings:
* Name: Enter myAppGateway for the name of the application gateway.
* Resource group: Select resource group from task 1.
* Select WAF for the tier of the application gateway.
5. On the Settings page, under Subnet configuration, select Choose a virtual network. 
6. On the Choose virtual network page, select Create new, and then enter values for the following virtual network settings:
* Name: Enter myVNet for the name of the virtual network.
* Address space: Enter 10.0.0.0/16 for the virtual network address space.
* Subnet name: Enter myAGSubnet for the subnet name.
The application gateway subnet can contain only application gateways. No other resources are allowed.
* Subnet address range: Enter 10.0.0.0/24 for the subnet address range.
7. Click OK to create the virtual network and subnet.
8. Choose the Frontend IP configuration. Under Frontend IP configuration, verify IP address type is set to Public. Under Public IP address, verify Create new is selected. 
9. Enter myAGPublicIPAddress for the public IP address name.
10. Accept the default values for the other settings and then select OK.
11. Review the settings on the Summary page, and then select OK.

## Task 3: Add App service as backend pool

1.In the Azure portal, open the configuration view of you application gateway.
2. Under Backend pools, click on Add to create a new backend pool.
3. Provide a suitable name to the backend pool.
4. Under Targets, click on the dropdown and choose App Services as the option.
5. A dropdown immediately below the Targets dropdown will appear which will contain a list of your App Services. From this dropdown, choose the App Service you want to add as a backend pool member and click Add.

## Task 4: Create HTTP settings for App service
1. Under HTTP Settings, click Add to create a new HTTP Setting.
2. Input a name for the HTTP Setting and you can enable or disable Cookie Based Affinity as per your requirement.
3. Choose the protocol as HTTP or HTTPS as per your use case.
4. Check the box for Use for App Service and it will turn on the Create a probe with pick host name from backend address and Pick host name from backend address options. This option will also create a probe automatically with the switch enabled and associate it to this HTTP Setting.
5. Click OK to create the HTTP setting.

## Task 5: Create Rule to tie the Listener, Backend Pool and HTTP Setting
1. Under Rules, click Basic to create a new Basic rule.
2. Provide a suitable name and select the listener which will be accepting the incoming requests for the App service.
3. In the Backend pool dropdown, choose the backend pool you created above.
4. In the HTTP setting dropdown, choose the HTTP setting you created above.
5. Click OK to save this rule.

## Task 6: Restrict Access
1. To add an access restriction rule to your app, use the menu to open Network>Access Restrictions and click on Configure Access Restrictions.
2. Click on [+] Add to add a new access restriction rule.



