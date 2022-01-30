FROM node:14

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

CMD yarn start:prod
