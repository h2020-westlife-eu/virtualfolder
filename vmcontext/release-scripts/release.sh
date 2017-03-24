#!/usr/bin/env bash
export X509_USER_CERT=/home/vagrant/.ssh/tk.crt
export X509_USER_KEY=/home/vagrant/.ssh/tk.key
./release-copy.sh bootstrap 17.03
./release-copy.sh conf 17.03
./release-copy.sh scripts 17.03
./release-copy-nr.sh www 17.03
./release-copy.sh www/css 17.03
./release-copy.sh www/img 17.03
./release-copy.sh www/scripts 17.03
./release-copy.sh www/src 17.03
./release-copy.sh www/test 17.03
./release-copy.sh www/tools 17.03
./release-copy.sh www/.well-known 17.03
#copy Metadataservice binaries
./release-copy.sh MetadataService 17.03