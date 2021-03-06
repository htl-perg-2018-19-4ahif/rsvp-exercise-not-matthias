# Source: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:8 

# Add app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Use port 8080
EXPOSE 8080

# Define the start command
CMD [ "npm", "run", "server" ]