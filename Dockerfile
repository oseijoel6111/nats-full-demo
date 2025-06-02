from alpine:latest

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

CMD [ "node", "core/subscriber.js" ]