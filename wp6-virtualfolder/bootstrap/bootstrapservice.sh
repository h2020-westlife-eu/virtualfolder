#!/usr/bin/env sh
# 28.10.2016 mono from cvmfs
# 17.10.2016 replaced postgresql by sqlite3
# 10.10.2016 moved mono 4.5 build to cvmfs
# 02.06.2016 replaced mysql by postgres

# build metadataservice
sudo -E -U vagrant cp -R $WP6SRC/src /home/vagrant
# download depended nuget packages DLL
#wget https://nuget.org/nuget.exe
#/bin/sh
source /cvmfs/west-life.egi.eu/tools/mono/mono-dev-env
# fix http://stackoverflow.com/questions/15181888/
wget --quiet -O certdata.txt https://hg.mozilla.org/mozilla-central/raw-file/tip/security/nss/lib/ckfw/builtins/certdata.txt
sudo -E -U vagrant mozroots --import --sync --file certdata.txt
#certmgr -ssl -m https://go.microsoft.com
#certmgr -ssl -m https://nugetgallery.blob.core.windows.net
#certmgr -ssl -m https://nuget.org
# restore nuget packages 
sudo -E -U vagrant nuget restore /home/vagrant/src/WP6Service2/WP6Service2.sln
# build project EXEcutable, workaround on xbuild bug - hangs after compilation
/home/vagrant/scripts/timeout3.sh -t 90 xbuild /home/vagrant/src/WP6Service2/WP6Service2.sln 
