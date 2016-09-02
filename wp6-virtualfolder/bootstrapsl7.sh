#!/usr/bin/env bash
#02/06/2016 tomas - added fromdos to all scripts as vagrant fixes CR-LF ending only on bootstrap.sh and not other scripts.
#09/06/2016 tomas - workaround, stopped ccp4 installation, not appropriate licence for further distribution
#03/08/2016 tomas - merged boostrapweb and bootstrapconf
#apt-get update
#apt-get install -y tofrodos
mkdir -p /home/vagrant/bootstrap
cp -R /vagrant/bootstrapsl7/* /home/vagrant/bootstrap
cp /vagrant/rc.local /home/vagrant
dos2unix /home/vagrant/bootstrap/*
dos2unix /home/vagrant/rc.local
chmod ugo+x /home/vagrant/bootstrap/*.sh
chown -R vagrant:vagrant /home/vagrant/bootstrap
/home/vagrant/bootstrap/bootstrapweb.sh
#/home/vagrant/bootstrapccp4.sh
/home/vagrant/bootstrap/bootstrapservice.sh
#/home/vagrant/bootstrapscipion.sh
#/home/vagrant/bootstrap/bootstrapdesktop.sh
#/home/vagrant/bootstrap/bootstrapstart.sh
