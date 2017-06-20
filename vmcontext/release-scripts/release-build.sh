#!/usr/bin/env bash
echo release-build
MYCD=`pwd`
cd $WP6SRC/www
npm install
au build

cd $MYCD

cd $WP6SRC/src/WP6Service
source /cvmfs/west-life.egi.eu/tools/mono/mono-dev-env
rm -rf $WP6SRC/build
# fix http://stackoverflow.com/questions/15181888/
for i in {1..3}; do 
    echo attemp $i
    if [ ! -f $WP6SRC/MetadataService/MetadataService.exe ]
    then
       echo Building MetadataService
	#clean from previous try
	rm -rf $WP6SRC/MetadataService
	

        sudo cert-sync /etc/pki/tls/certs/ca-bundle.crt
	#certmgr -ssl -m https://go.microsoft.com
	#certmgr -ssl -m https://nugetgallery.blob.core.windows.net
	#certmgr -ssl -m https://nuget.org
	# restore nuget packages 
	#nuget restore /home/vagrant/src/WP6Service2/WP6Service2.sln
	# build project EXEcutable, workaround on xbuild bug - hangs after compilation
	$WP6SRC/scripts/timeout3.sh -t 90 xbuild $WP6SRC/src/WP6Service2/Build.proj
    fi
done
cd $MYCD