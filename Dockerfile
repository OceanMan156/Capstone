from node:14.20.1-bullseye-slim
RUN apt-get update && apt-get -y install curl
WORKDIR /home/node/app
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 3000
RUN npm install nodemon -g
ENTRYPOINT nodemon app.js

