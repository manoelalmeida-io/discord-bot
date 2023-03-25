FROM node:16 as base

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

RUN apt update
RUN apt install ffmpeg -y

COPY . .

FROM base as production

RUN npm run build

CMD ["npm", "start"]