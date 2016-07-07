FROM dockerhub.contactis.pl/node
MAINTAINER Jarosław Płocki <jaroslaw.plocki@itelo.pl>

ADD docker/nginx.conf               /etc/nginx/sites-enabled/default
ADD docker/init_scripts/nginx.sh    /etc/service/nginx/run
ADD docker/init_scripts/frontend.sh /etc/service/frontend/run

WORKDIR /profitelo-frontend

ADD package.json /profitelo-frontend/
ADD .npmrc /profitelo-frontend/

RUN npm install

ADD . /profitelo-frontend

RUN ln -s phantomjs-prebuilt node_modules/phantomjs

CMD ["/sbin/my_init", "--enable-insecure-key"]
