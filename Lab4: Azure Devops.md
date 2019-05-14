<img src="../../img/logo.jpg" alt="Cloudstate logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Lab4: Azure Devops.

## LAB Overview

#### This lab will demonstrate:
* Creating CI/CD pipelines
* Build Nodejs application in cloud.
* Deploy to WebApp


### Requirements
* Visual studio code
* Azure extension to VS Code https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice
* git client

## Task 1: Initialize account and push code

1. Open url: https://dev.azure.com
2. Create project: fevisualization
3. On left menu click Repos -> Files.
4. Clone repository using VS Code.
5. Provide directory and credentials for repo.
6. Create .gitignore file and isert code:
```
.DS_STORE

/dist/
/bazel-out
/integration/bazel/bazel-*
e2e_test.*
node_modules
tools/gulp-tasks/cldr/cldr-data/

# Include when developing application packages.
pubspec.lock
.c9
.idea/
.devcontainer
.settings/
.vscode/launch.json
.vscode/settings.json
*.swo
modules/.settings
modules/.vscode

# Don't check in secret files
*secret.js

# Ignore npm/yarn debug log
npm-debug.log
yarn-error.log

# build-analytics
.build-analytics

# rollup-test output
/modules/rollup-test/dist/

# User specific bazel settings
.bazelrc.user
```
7. Copy solution files from lab3 to your git directory.
8. Open in vs code app folder.
9. Click git in left menu.
10. Commit all changes.
11. Push it to repository.

## Task 2: Create build definition
1. Click Pipelines -> Builds on left menu.
2. Click *New pipeline* button.
3. Choose Azure repository and select your repo.
4. Select Nodejs with Angular as pipeline configuration.
5. Add task: *Publish artifact* and choose target path *dist*
5. Click *Save and run*

## Task 3: Create realese definition
1. Click Pipelines -> Releases on left menu.
2. Click *New pipeline* button.
3. Select template *Azure App Service deployment*.
4. Click *Add an artifact*.
5. Select artifact from build.
6. Click on *1 job* at stage1.
7. Configure Azure Subsrciption and click *Authorize*
8. Choose a web app created at lab 3.
9. Click on *Deploy Azure App Service*
10. Choose resource group from dropbox.
11. Select stage deployment slot.
12. Click *Save*
13. Go to Pipelines -> Releases
14. Click *Create a release*
15. Choose a stage env and click *Start*.

<br><br>

<center><p>&copy; 2019 Chmurowisko Sp. z o.o.<p></center>
