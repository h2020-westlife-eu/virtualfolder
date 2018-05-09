#!/usr/bin/env bash

# 27.06.2016 mono from distribution, nuget install from distribution
# 28.10.2016 mono from cvmfs
# 17.10.2016 replaced postgresql by sqlite3
# 10.10.2016 moved mono 4.5 build to cvmfs
# 02.06.2016 replaced mysql by postgres

# install nuget
if hash mono 2>/dev/null; then
  echo using preinstaled mono
else
  yum -y install mono-devel
fi
yum -y install nuget
rm -rf /opt/virtualfolder/MetadataService
# fix http://stackoverflow.com/questions/15181888/
for i in {1..3}; do
    echo attemp $i
    if [ ! -f /opt/virtualfolder/MetadataService/MetadataService.exe ]
    then
       echo Building MetadataService
	#clean from previous try
	rm -rf /opt/virtualfolder/MetadataService
	rm -rf /opt/virtualfolder/src
	# build metadataservice
	cp -R $WP6SRC/src /opt/virtualfolder

    cert-sync /etc/pki/tls/certs/ca-bundle.crt
	$WP6SRC/scripts/timeout3.sh -t 90 xbuild /opt/virtualfolder/src/WP6Service2/Build.proj
    fi
done
mkdir -p /var/log/westlife
chmod -R go+wx /var/log/westlife

#generate random key
if [ -f /etc/westlife/metadata.key ]
then
   `cat /etc/westlife/metadata.key`
   export VF_STORAGE_PKEY
else
   export VF_STORAGE_PKEY=`openssl rand -base64 32`
   echo VF_STORAGE_PKEY=$VF_STORAGE_PKEY > /etc/westlife/metadata.key
fi
