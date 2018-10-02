#!/usr/bin/env bash
#WP6MODULE = 'wp6-virtualfolder' or 'wp6-repository'
echo release-build of ${WP6MODULE}
MYCD=`pwd`

if [ -d $WP6SRC/${WP6MODULE}/www ];then
  cd $WP6SRC/${WP6MODULE}/www
else
  cd $WP6SRC/${WP6MODULE}/frontend
fi

if [ -f package.json ];then
  npm install
  sudo npm install aurelia-cli -g
  au build
fi

cd $MYCD

if [ -d $WP6SRC/${WP6MODULE}/src/WP6Service ]; then
  cd $WP6SRC/${WP6MODULE}/src/WP6Service
  source /cvmfs/west-life.egi.eu/tools/mono/mono-dev-env
  #clean from previous try
  echo Building MetadataService
  rm -rf $WP6SRC/${WP6MODULE}/MetadataService
  sudo cert-sync /etc/pki/tls/certs/ca-bundle.crt
  xbuild $WP6SRC/${WP6MODULE}/src/WP6Service2/Build.proj
  cd $MYCD
fi
