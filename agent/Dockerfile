FROM docker.arvancloud.ir/node:22.11.0-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]