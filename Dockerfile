FROM node:14

WORKDIR /usr/app

COPY package.json .

RUN yarn install

RUN npm install -g nodemon

COPY . .