#!/usr/bin/env bash
#02/06/2016 tomas - added fromdos to all scripts as vagrant fixes CR-LF ending only on bootstrap.sh and not other scripts.
#09/06/2016 tomas - workaround, stopped ccp4 installation, not appropriate licence for further distribution
#03/08/2016 tomas - merged boostrapweb and bootstrapconf
#31/08/2016 tomas - SL 7 branch - apt-get replaced by yum
mkdir -p /home/vagrant/bootstrap/
cp /vagrant/*.sh /home/vagrant/bootstrap
mkdir -p /home/vagrant/scripts
cp /vagrant/scripts/* /home/vagrant/scripts
cp /vagrant/rc.local /home/vagrant/bootstrap
dos2unix /home/vagrant/scripts/*.sh
dos2unix /home/vagrant/bootstrap/*.sh
dos2unix /home/vagrant/bootstrap/rc.local
chmod ugo+x /home/vagrant/bootstrap/*.sh
#/home/vagrant/bootstrap/bootstrapweb.sh
#/home/vagrant/bootstrap/bootstrapccp4.sh
#/home/vagrant/bootstrap/bootstrapservice.sh
#/home/vagrant/bootstrap/bootstrapscipion.sh
#/home/vagrant/bootstrap/bootstrapdesktop.sh
#/home/vagrant/bootstrap/bootstrapstart.sh
