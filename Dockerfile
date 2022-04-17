FROM nginx:1.15-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY /dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY /src/assets/settings.json /usr/share/nginx/html/assets/settings.json

ADD startup.sh /opt/startup.sh
RUN chmod +x /opt/startup.sh
CMD sh /opt/startup.sh


