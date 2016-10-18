#!/usr/bin/env bash
#17/10/2016 tomas - bootstrapt from cvmfs, cloud version
#09/06/2016 tomas - workaround, stopped ccp4 installation, not appropriate licence for further distribution
#03/08/2016 tomas - merged boostrapweb and bootstrapconf
#apt-get update
#apt-get install -y tofrodos
wget --quiet https://github.com/h2020-westlife-eu/west-life-wp6/archive/master.zip
unzip -q master.zip -d /home/vagrant
rm master.zip
export WP6SRC=/home/vagrant/west-life-wp6-master/wp6-virtualfolder
mkdir -p /home/vagrant/bootstrap
cp -R $WP6SRC/bootstrapcloud/* /home/vagrant/bootstrap
dos2unix /home/vagrant/bootstrap/*
chmod ugo+x /home/vagrant/bootstrap/*.sh
chown -R vagrant:vagrant /home/vagrant/bootstrap
/home/vagrant/bootstrap/bootstrap.sh
