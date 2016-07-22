#!/bin/bash

cd /profitelo-frontend
npm install
gulp serve --turbo-translations --no-tests --no-live-reload --md5
