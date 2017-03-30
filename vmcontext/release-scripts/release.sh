#!/usr/bin/env bash
export X509_USER_CERT=/home/vagrant/.ssh/tk.crt
export X509_USER_KEY=/home/vagrant/.ssh/tk.key
export VERSION=17.04
./release-copy.sh bootstrap $VERSION
./release-copy.sh conf $VERSION
./release-copy.sh scripts $VERSION
./release-copy-nr.sh www $VERSION
./release-copy.sh www/css $VERSION
./release-copy.sh www/img $VERSION
./release-copy.sh www/scripts $VERSION
./release-copy.sh www/src $VERSION
./release-copy.sh www/test $VERSION
./release-copy.sh www/tools $VERSION
./release-copy.sh www/.well-known $VERSION
#copy Metadataservice binaries
./release-copy.sh MetadataService $VERSION