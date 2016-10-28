#!/usr/bin/env sh
# 28.10.2016 mono from cvmfs
# 17.10.2016 replaced postgresql by sqlite3
# 10.10.2016 moved mono 4.5 build to cvmfs
# 02.06.2016 replaced mysql by postgres

# build metadataservice
cp -R $WP6SRC/src /home/vagrant
# download depended nuget packages DLL
#wget https://nuget.org/nuget.exe
#/bin/sh
source /cvmfs/west-life.egi.eu/tools/mono/mono-dev-env
# fix http://stackoverflow.com/questions/15181888/
mozroots --import --sync
#certmgr -ssl -m https://go.microsoft.com
#certmgr -ssl -m https://nugetgallery.blob.core.windows.net
#certmgr -ssl -m https://nuget.org
# restore nuget packages 
nuget restore /home/vagrant/src/WP6Service2/WP6Service2.sln
# build project EXEcutable, workaround on xbuild bug - hangs after compilation 
xbuild /home/vagrant/src/WP6Service2/WP6Service2.sln & sleep 60; killall /cvmfs/west-life.egi.eu/tools/mono/4.6.1/bin/mono
