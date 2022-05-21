FROM node:16-stretch

WORKDIR /app/ShoppingCart

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "shoppingCart_controller.js"]