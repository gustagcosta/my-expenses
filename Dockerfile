FROM node:16.15
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
EXPOSE 3333
RUN npm run build
CMD ["npm", "start"]
