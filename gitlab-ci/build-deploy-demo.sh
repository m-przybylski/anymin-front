#!/usr/bin/env bash

kubectl config use-context gke_dev-country-188109_europe-west2-b_anymind-demo-eu

branch=master

common=master

env=build-demo

image=demo

echo $branch

echo $common

echo $env

echo $image

docker build --no-cache -t eu.gcr.io/dev-country-188109/profitelo-frontend:$image . --build-arg branch=$branch

docker push eu.gcr.io/dev-country-188109/profitelo-frontend:$image

helm del --purge am-frontend

helm install --wait --name am-frontend helm/ -f helm/values-demo.yaml
