#!/bin/bash

cd /profitelo-frontend
npm install
#gulp serve --turbo-translations --no-tests --no-live-reload --md5 2>&1 | tee -a /var/log/gulp.log
#npm run serve 2>&1 | tee -a /var/log/gulp.log
npm run ci-serve
sleep infinity
