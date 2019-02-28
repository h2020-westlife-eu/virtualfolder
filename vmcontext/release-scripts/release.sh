#!/usr/bin/env bash
# change version for every release
export VERSION=18.11

#change to path to your X509 certs
export X509_USER_CERT=/home/vagrant/.ssh/tk.crt
export X509_USER_KEY=/home/vagrant/.ssh/tk.key

# keep untouched the rest
export WP6MODULE=wp6-virtualfolder
export WP6SRC=/opt/virtualfolder-src/virtualfolder
#remote module name will be just 'virtualfolder'
export WP6REMOTEMODULE=${WP6MODULE:4}

# install and prepare dependencies, ssh keys, gsissh tool, certificates to upload to cvmfs
./release-install-dep.sh
# prepare conf files to point to exact version instead of 'latest' link
./release-prepare.sh conf-template conf $VERSION -noreplacelatest
./release-build.sh
./release-mkdir.sh $VERSION
./release-copy.sh bootstrap $VERSION
./release-copy.sh conf $VERSION
./release-copy.sh scripts $VERSION
./release-copy.sh singlevre $VERSION
./release-mkdir.sh $VERSION/www
./release-copyto.sh www/dist $VERSION www
#copy Metadataservice binaries
./release-mkdir.sh $VERSION/MetadataService
./release-copyto.sh src/VFMetadata/MetadataService/bin/Release $VERSION MetadataService
./release-copyfile.sh src/VFMetadata/webdavhash2path/bin/Release/webdavhash2path.exe $VERSION MetadataService
./release-copyfile.sh src/VFMetadata/webdavhash2path/webdavhash2path $VERSION MetadataService
