FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --production

COPY ./src ./src

CMD ["npm", "start"]