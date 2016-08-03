#!/usr/bin/env bash
#02/06/2016 tomas - added fromdos to all scripts as vagrant fixes CR-LF ending only on bootstrap.sh and not other scripts.
#09/06/2016 tomas - workaround, stopped ccp4 installation, not appropriate licence for further distribution
#03/08/2016 tomas - merged boostrapweb and bootstrapconf
apt-get update
apt-get install -y tofrodos
cp /vagrant/*.sh /home/vagrant
cp /vagrant/rc.local /home/vagrant
fromdos /home/vagrant/*.sh
fromdos /home/vagrant/rc.local
chmod ugo+x /home/vagrant/*.sh
/home/vagrant/bootstrapdesktop.sh
/home/vagrant/bootstrapweb.sh
#/home/vagrant/bootstrapccp4.sh
#/home/vagrant/bootstrapservice.sh
#/home/vagrant/bootstrapscipion.sh
/home/vagrant/bootstrapstart.sh
