#!/usr/bin/env bash

# 28.10.2016 mono from cvmfs
# 17.10.2016 replaced postgresql by sqlite3
# 10.10.2016 moved mono 4.5 build to cvmfs
# 02.06.2016 replaced mysql by postgres

# download depended nuget packages DLL
#wget https://nuget.org/nuget.exe
#/bin/sh
source /cvmfs/west-life.egi.eu/tools/mono/mono-dev-env
rm -rf /home/vagrant/build
# fix http://stackoverflow.com/questions/15181888/
for i in {1..3}; do 
    echo attemp $i
    if [ ! -f /home/vagrant/build/MetadataService/MetadataService.exe ]
    then
       echo Building MetadataService
	#clean from previous try
	rm -rf /home/vagrant/build
	rm -rf /home/vagrant/src
	# build metadataservice
	cp -R $WP6SRC/src /home/vagrant
	if [ -f certdata.txt ]
	then
	    echo certdata.txt exists
	else
	    echo downloading certdata.txt
	    wget --quiet -O certdata.txt https://hg.mozilla.org/mozilla-central/raw-file/tip/security/nss/lib/ckfw/builtins/certdata.txt
	fi
	mozroots --import --sync --file certdata.txt
	#certmgr -ssl -m https://go.microsoft.com
	#certmgr -ssl -m https://nugetgallery.blob.core.windows.net
	#certmgr -ssl -m https://nuget.org
	# restore nuget packages 
	nuget restore /home/vagrant/src/WP6Service2/WP6Service2.sln
	# build project EXEcutable, workaround on xbuild bug - hangs after compilation
	/home/vagrant/scripts/timeout3.sh -t 90 xbuild /home/vagrant/src/WP6Service2/WP6Service2.sln 
    fi
done
mkdir -p /home/vagrant/logs
chmod -R ugo+rwx /home/vagrant/logs
#generate random key
if [ -f randomkey.txt ]
then
   export VF_STORAGE_PKEY=`cat randomkey.txt`
else
   export VF_STORAGE_PKEY=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
   echo $VF_STORAGE_PKEY > randomkey.txt
fi
