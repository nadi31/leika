
FROM node:22.2

WORKDIR /leika/front/

COPY package*.json /leika/front/
RUN npm install

COPY . /leika/front/

CMD ["npm", "start"]
