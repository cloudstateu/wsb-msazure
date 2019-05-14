FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
ENV connectionstring ''
ENV deviceid 'bf938c56-244d-4bf6-a1ac-17da8d62ef83'
ENV TIME 1000
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
ENTRYPOINT [ "npm", "start" ]