#!/usr/bin/env bash

kubectl config use-context admin-cluster.local

branch=develop

common=feature/new-dev-config

env=build-dev

image=develop

echo $branch

echo $common

echo $env

echo $image

docker build --no-cache -t eu.gcr.io/dev-country-188109/profitelo-frontend:$image . --build-arg branch=$branch

docker push eu.gcr.io/dev-country-188109/profitelo-frontend:$image

helm del --purge am-dev-frontend

helm install --wait --name am-dev-frontend helm/ -f helm/values-dev.yaml