#!/usr/bin/env bash
export X509_USER_CERT=/home/vagrant/.ssh/tk.crt
export X509_USER_KEY=/home/vagrant/.ssh/tk.key
export WP6SRC=/home/vagrant/west-life-wp6-master
export VERSION=17.09
# adding X bit to all html with include
#chmod ugo+x `grep -rl $WP6SRC'/wp6-virtualfolder/www' -e "<\!--\#include"`
#./release-prepare.sh conf-template conf $VERSION
./release-build.sh
./release-mkdir.sh $VERSION
./release-copy.sh bootstrap $VERSION
./release-copy.sh conf $VERSION
./release-copy.sh scripts $VERSION
./release-copy.sh singlevre $VERSION
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
