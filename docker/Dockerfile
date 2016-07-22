FROM dockerhub.contactis.pl/node
MAINTAINER Jarosław Płocki <jaroslaw.plocki@itelo.pl>

WORKDIR /profitelo-frontend

ADD package.json .
ADD .npmrc .

RUN npm install
RUN ln -s phantomjs-prebuilt node_modules/phantomjs

ADD . .

ADD docker/nginx.conf               /etc/nginx/sites-enabled/default
ADD docker/init_scripts/nginx.sh    /etc/service/nginx/run
ADD docker/init_scripts/frontend.sh /etc/service/frontend/run

