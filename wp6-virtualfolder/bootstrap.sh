#!/usr/bin/env bash
#02.06.2016 tomas - added fromdos to all scripts as vagrant fixes CR-LF ending only on bootstrap.sh and not other scripts.
#09.06.2016 tomas - workaround, stopped ccp4 installation, not appropriate licence for further distribution
sudo apt-get update
sudo apt-get install -y tofrodos
sudo cp /vagrant/*.sh /home/vagrant
sudo cp /vagrant/rc.local /home/vagrant
fromdos /home/vagrant/*.sh
fromdos /home/vagrant/rc.local
chmod ugo+x /home/vagrant/*.sh
/home/vagrant/bootstrapweb.sh
/home/vagrant/bootstrapconf.sh
#/home/vagrant/bootstrapccp4.sh
/home/vagrant/bootstrapservice.sh
/home/vagrant/bootstrapstart.sh
/home/vagrant/bootstrapscipion.sh
