FROM nodesource/trusty

COPY node/app /home/node/app
COPY node/*.js node/.* node/package.json /home/node/ 

ENV DISPLAY :99 

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update 
RUN apt-get upgrade -y 
RUN apt-get dist-upgrade -y 
RUN apt-get install -y software-properties-common 
RUN	apt-get install -y libgtk2.0-0 libgconf2-4 libnss3 libasound2 \
	libxtst6 xvfb gtk2-engines-pixbuf libnotify-dev dbus-x11

RUN npm install --prefix /home/node && \
	npm run build --prefix /home/node && \
	Xvfb -ac -screen scrn 1280x2000x24 :99 &

CMD npm start --prefix /home/node