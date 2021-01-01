#!/bin/sh

docker run --rm -d -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=eoloplantsDB -p 3306:3306 --name mysql mysql:8.0.22