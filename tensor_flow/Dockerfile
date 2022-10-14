from jupyter/scipy-notebook:ubuntu-22.04

RUN pip install tensorflow numpy opencv-python pillow pandas scikit-learn scikit-image matplotlib pylint

USER root
RUN sudo apt-get update && sudo apt-get -y install nodejs
WORKDIR /home/jovyan/work
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 8080
COPY ../package.json .
COPY ../package-lock.json .
COPY ../node_modules .
COPY ../tensor_flow/webhook.js .

ENTRYPOINT node webhook.js

