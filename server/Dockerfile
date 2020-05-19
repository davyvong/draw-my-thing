FROM node:10

WORKDIR /usr/src/app

COPY dist .

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN yarn install --silent

CMD node -r ./config main