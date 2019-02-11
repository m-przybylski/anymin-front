#!/usr/bin/env bash

echo $G_CLOUD_SERVICE_ACCOUNT_KEY  > /etc/.gcloud-key.json

~/google-cloud-sdk/bin/gcloud auth activate-service-account --key-file=/etc/.gcloud-key.json
~/google-cloud-sdk/bin/gcloud config set project dev-country-188109
~/google-cloud-sdk/bin/gcloud container clusters get-credentials anymind-prod-eu --zone europe-west2-a
~/google-cloud-sdk/bin/gcloud container clusters get-credentials tf-anymind-stage --zone europe-west2-b
