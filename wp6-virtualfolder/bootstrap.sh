#!/usr/bin/env bash
#02.06.2016 tomas - added fromdos to all scripts as vagrant fixes CR-LF ending only on bootstrap.sh and not other scripts.
#09.06.2016 tomas - workaround, stopped ccp4 installation, not appropriate licence for further distribution
sudo apt-get install -y tofrodos
fromdos /vagrant/*.sh
fromdos /vagrant/rc.local
/vagrant/bootstrapweb.sh
/vagrant/bootstrapconf.sh
#/vagrant/bootstrapccp4.sh
/vagrant/bootstrapservice.sh
/vagrant/bootstrapstart.sh

