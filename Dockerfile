from node:14.20.1-bullseye-slim
WORKDIR /home/node/app
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 3000
COPY . .

ENTRYPOINT node app.js

