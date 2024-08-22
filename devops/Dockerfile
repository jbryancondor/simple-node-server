FROM node:14-alpine
WORKDIR /opt/${APP_NAME}
COPY package*.json ./
RUN ["npm", "install", "--only=production"]
COPY . .
CMD ["npm", "run", "start"]