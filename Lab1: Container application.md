# Hands-on 1: Nodejs container application
In this lab we will learn how to create nodejs application and put it inside Docker container.

## Requirements
<ul>
<li> Docker: https://www.docker.com/products/docker-desktop
</li>
<li> NodeJs current https://nodejs.org/en/</li>

## TASK 1: Create NodeJS application
1. Create new folder realtime-data
2. 

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
