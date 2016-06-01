#!/usr/bin/env bash
sudo apt-get install -y tofrodos
fromdos /vagrant/*.sh
/vagrant/bootstrapweb.sh
/vagrant/bootstrapconf.sh
/vagrant/bootstrapccp4.sh
/vagrant/bootstrapservice.sh
/vagrant/bootstrapstart.sh

