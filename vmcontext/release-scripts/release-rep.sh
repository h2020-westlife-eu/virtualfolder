#!/usr/bin/env bash
# release script for wp6-repository
# change version for every release
export VERSION=18.05
export WP6MODULE=wp6-repository
#export WP6MODULE=wp6-repository

# keep untouched the rest
export X509_USER_CERT=/home/vagrant/.ssh/vagrant.crt
export X509_USER_KEY=/home/vagrant/.ssh/vagrant.key
export WP6SRC=/home/vagrant/west-life-wp6-master
export WP6REMOTEMODULE=${WP6MODULE:4}

# adding X bit to all html with include
chmod ugo+x `grep -rl $WP6SRC'/wp6-repository/frontend' -e "<\!--\#include"`

./release-install-dep.sh
# TODO any service that will point to the /latest from 17.11 will now point to /latest not to /17.11
# TODO consider whether latest should be kept and pointing to previous version can be made manually only
# prepare conf files to point to exact version instead of 'latest' link
./release-prepare.sh conf-template conf $VERSION -noreplacelatest
#./release-build.sh
./release-mkdir.sh $VERSION
./release-copy-nr.sh frontend $VERSION
./release-copy.sh frontend/css $VERSION
./release-copy.sh frontend/img $VERSION
./release-copy.sh frontend/scripts $VERSION
./release-copy.sh frontend/src $VERSION
./release-copy-nr.sh backend $VERSION
./release-copy.sh backend/lib $VERSION
./release-copy.sh backend/src $VERSION
./release-copy.sh conf $VERSION

# TODO Is well-known needed for repository instance?
#./release-copy.sh frontend/.well-known $VERSION
