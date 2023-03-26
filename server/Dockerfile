FROM node:16.14-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install

ADD ./ ./

RUN npm run build

COPY ./dist ./dist

CMD ["npm", "run", "start"]