FROM nodesource/trusty

COPY node/app /home/node/app
COPY node/*.js node/.* node/*.json /home/node/ 
COPY docker/xvfbRH.sh /home/

ENV DISPLAY :99 

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update 
RUN apt-get upgrade -y 
RUN apt-get dist-upgrade -y 
RUN apt-get install -y software-properties-common 
RUN	apt-get install -y libgtk2.0-0 libgconf2-4 libnss3 libasound2 \
	libxtst6 xvfb gtk2-engines-pixbuf libnotify-dev dbus-x11 libxss1

RUN npm install --dev --prefix /home/node 
RUN npm run build --prefix /home/node 
RUN chmod 777 /home/xvfbRH.sh

CMD /home/xvfbRH.sh