# Hands-on 1: Nodejs container application
In this lab we will learn how to create nodejs application and put it inside Docker container.

## Requirements
<ul>
<li> Docker: https://www.docker.com/products/docker-desktop
</li>
<li> NodeJs current https://nodejs.org/en/</li>

## TASK 1: Create Docker Image

## TASK 2: Create Azure Container Repository and push image
1. Open Azure Portal. 
2. Click Create Resource on left menu. 
3. Click Containers -> Azure Container Registry. 
4. On the Create container registry page provide the following configurations: 
<ul><li>Registry name: student0Xregistry </li>
<li>Resource Group: student0X </li>
<li>Location: <default as VM> </li>
<li>Admin user: Enabled </li>
<li>SKU: Standard </li></ul>
Next click on Create. 
  
5. Go to deployed resource and on left menu click Access keys. 
6. Copy user name, password and login server. 
7. Open console and type docker login –p passwordCopiedFromPoint6 –u userNameCopiedFromPoint6 loginServerFromPoint6 
8. Tag image with repository by typing in console: docker tag containerapp loginServerFromPoint6/containerapp 
9. Push image to repository by typing in console: docker push loginServerFromPoint6/containerapp 
10. After push process is finished, go to portal to Azure Container Registry. 
11. Open your ACR. 
12. On left menu, in Services section click Repositories. 
13. Check if your image is on the list. 
