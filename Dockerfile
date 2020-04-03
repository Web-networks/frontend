FROM node:10

WORKDIR /app

# установка зависимоcтей
COPY package.json .
COPY yarn.lock .
RUN yarn

# сборка
COPY . .
RUN yarn build

CMD [ "yarn", "start"]