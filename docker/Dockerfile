FROM nodesource/trusty

COPY node/app /home/node/app
COPY node/*.js node/.* node/*.json /home/node/ 

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update 
RUN apt-get upgrade -y 
RUN apt-get dist-upgrade -y 
RUN apt-get install -y software-properties-common 
RUN	apt-get install -y libgtk2.0-0 libgconf2-4 libnss3 libasound2 \
	libxtst6 xvfb gtk2-engines-pixbuf libnotify-dev dbus-x11 libxss1 libcanberra-gtk3-module

RUN npm install --dev --prefix /home/node 
RUN npm run build --prefix /home/node 

RUN node -v 
RUN npm -v

ENTRYPOINT npm start --prefix /home/node