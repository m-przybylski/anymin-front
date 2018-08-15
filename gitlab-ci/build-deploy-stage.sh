#!/usr/bin/env bash

kubectl config use-context admin-cluster.local

branch=stage

common=master

env=build-stage

image=stage

echo $branch

echo $common

echo $env

echo $image

docker build --no-cache -t eu.gcr.io/dev-country-188109/profitelo-frontend:$image . --build-arg branch=$branch

docker push eu.gcr.io/dev-country-188109/profitelo-frontend:$image

helm del --purge am-stage-frontend

helm install --wait --name am-stage-frontend helm/ -f helm/values-stage.yaml