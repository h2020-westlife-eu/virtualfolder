#!/usr/bin/env bash

function help {
echo Usage:
echo -  testwebdav.sh [PUT] [url] [data]
echo Samples:
echo -  testwebdav.sh PUT https://portal.west-life.eu/webdav/123123/readme.txt "this is demo text"
echo -  testwebdav.sh https://portal.west-life.eu/webdav/123123/readme.txt
}

if [ $# -eq 0 ]; then
    help
    exit
else 
  if [ $1 == 'PUT' ]; then    
    curl -X PUT $2 --data "$3"
  else
    curl $1  
  fi
fi
