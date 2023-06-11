#!/bin/bash

rm -rf app
[ $? != 0 ] && echo "Cannot remove app directory"

rsync -av --exclude='node_modules' --exclude='build' --exclude='dist' ../../app . > /dev/null 2>&1

docker build . -t mtesluk/covid-eu
docker push mtesluk/covid-eu
