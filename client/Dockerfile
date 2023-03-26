FROM node:16.14-alpine

RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
ADD ./ ./


RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]