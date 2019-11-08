#! /usr/bin/env bash
yarn build
az storage blob delete-batch -s \$web --account-name warble
az storage blob upload-batch -s dist -d \$web --account-name warble
