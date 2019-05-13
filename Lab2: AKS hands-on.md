<img src="../../img/logo.jpg" alt="Cloudstate logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Introduction to Azure Kubernetes Services

## LAB Overview

#### This lab will demonstrate:
* How to create cluster using Azure CLI.
* How to create namespace.
* How to deploy POD and service.
* How to create healtcheck

## Task 1: Create AKS cluster

1. Open web browser and go to: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest 
2. Install Azure CLI. 
3. Open command line and type: az login 
4. Procced with instruction in console window. 
5. After login process type in console: <code> az aks create --resource-group student0X --name student0XCluster --generate-ssh-keys </code>
6. After cluster is deployed (it make takes up to 30 minutes), install Kubernetes CLI by typing in console: <code> az aks kubernetes install-cli </code> On Windows, the default installation is c:\program files (x86)\kubectl.exe. You may need to add this file to the Windows path. 
7. Get credentials to cluster: <code> az acs kubernetes get-credentials --resource-group student0X --name student0XCluster </code>
8. Verify connection using command: <code>kubectl get nodes </code>

## Task 2: Create secret and deploy POD

In this section, you will learn how to create deployment file and how to deploy it. 
 
1. Create secret for ACR: <code>kubectl create secret docker-registry <SECRET_NAME> --docker-server loginServerFromPoint6Task3 --docker-email <YOUR_MAIL> --docker-username= userNameCopiedFromPoint6Task3 --docker-password passwordCopiedFromPoint6Task3 </code>
2. Create deployment file (deployment-db.yml): 
```
apiVersion: apps/v1beta1 
kind: Deployment 
metadata: 
  name: berealtime 
spec: 
  replicas: 1 
  template: 
    metadata: 
      labels: 
        app: berealtime 
    spec: 
      containers: 
      - name: mongo 
        image: mongo 
        ports: 
        - containerPort: 27017 
        env:
          - name: MONGO_INITDB_ROOT_USERNAME
            value: admin
          - name: MONGO_INITDB_ROOT_PASSWORD
            value: secret
---
apiVersion: v1 
kind: Service 
metadata: 
  name: mongo 
spec: 
  type: ClusterIP 
  ports: 
  - port: 3000 
  selector: 
    app: mongo 
```
 3. Open console and type: <code>kubectl create –f pathToDeploymentFile </code>
 4. Verify status using command: <code>kubectl get pods</code>
 5. Create application deployment file (deployment-app.yml):
 ```
 ---
apiVersion: apps/v1beta1 
kind: Deployment 
metadata: 
  name: berealtime 
spec: 
  replicas: 1 
  template: 
    metadata: 
      labels: 
        app: berealtime 
    spec: 
      containers: 
      - name: berealtime 
        image: loginServerFromPoint6Task3/berealtime 
        ports: 
        - containerPort: 3000 
        env:
          - name: DBURL
            value: mongodb://admin:secret@mongo:27017
          - name: TIMEOUT
            value: '5000'
      imagePullSecrets: 
      - name: SECRET_NAME</code>
```
 6. Open console and type: <code>kubectl create –f pathToDeploymentFile </code>
 7. Verify status using command: <code>kubectl get pods</code>

 
<center><p>&copy; 2019 Chmurowisko Sp. z o.o.<p></center>
