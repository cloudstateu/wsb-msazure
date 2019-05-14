FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
ENV connectionstring ''
ENV deviceid 'bf938c56-244d-4bf6-a1ac-17da8d62ef83'
ENV TIME 1000
RUN npm install
COPY . .
ENTRYPOINT [ "npm", "start" ]