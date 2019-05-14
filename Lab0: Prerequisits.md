<img src="https://avatars1.githubusercontent.com/u/47143554?s=400&u=7c55eeec6479b4ff59df7cad452501a41635b0e4&v=4" alt="Cloudstate logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Lab 0: Install the environment

## LAB Overview

#### This lab will help you to prepare the environment required for the rest of the workshop

## TASK 1: Create the dev. VM
1. Open the portal.azure.com
2. Go to "Create a resources" button 
3. Type "Visual Studio Community 2017" and choose from the list of templates the one named "Visual Studio Community 2017 (latest release) on Windows Server 2016 (x64)"
4. While choosing the parameters of the VM, please make sure to choose the size: A5 or D4s_v3.
You have to make sure the size you are choosing is supporting nested virtualization technology.
5. Once the VM will be created please go to Control Panel and install the Hyper-V role on the server. 
You can use this link to do this: https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/get-started/install-the-hyper-v-role-on-windows-server#BKMK_SERV
6. You will have to restart your VM once.
7. Once the VM will be restarted you can close this Lab and start the next one. 
