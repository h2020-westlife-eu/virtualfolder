#!/usr/bin/env bash
# change version for every release
export VERSION=18.06
export WP6MODULE=wp6-virtualfolder
#export WP6MODULE=wp6-repository

# keep untouched the rest
export X509_USER_CERT=/home/vagrant/.ssh/vagrant.crt
export X509_USER_KEY=/home/vagrant/.ssh/vagrant.key
export WP6SRC=/home/vagrant/west-life-wp6-master
export WP6REMOTEMODULE=${WP6MODULE:4}

# adding X bit to all html with include
chmod ugo+x `grep -rl $WP6SRC'/wp6-virtualfolder/www' -e "<\!--\#include"`

./release-install-dep.sh
# TODO any service that will point to the /latest from 17.11 will now point to /latest not to /17.11
# TODO consider whether latest should be kept and pointing to previous version can be made manually only
# prepare conf files to point to exact version instead of 'latest' link
./release-prepare.sh conf-template conf $VERSION -noreplacelatest
./release-build.sh
./release-mkdir.sh $VERSION
./release-copy.sh bootstrap $VERSION
./release-copy.sh conf $VERSION
./release-copy.sh scripts $VERSION
./release-copy.sh singlevre $VERSION
./release-mkdir.sh $VERSION/www
./release-copy.sh www/dist $VERSION
#copy Metadataservice binaries
./release-copy.sh MetadataService $VERSION
