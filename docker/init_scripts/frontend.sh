#!/bin/bash

cd /profitelo-frontend
source ./common-config/environment
gulp serve --turbo-translations --no-tests --no-live-reload --md5
