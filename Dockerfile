FROM node:18.18.0

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000