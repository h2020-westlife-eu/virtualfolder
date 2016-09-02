#!/usr/bin/env bash
# download ccp4, configure and install
echo Downloading and installing CCP4, it may take several minutes ...
wget -q ftp://ftp.ccp4.ac.uk/ccp4/current/ccp4-7.0-linux-x86_64.tar.bz2 -O ccp4.tar.bz2
tar -xjf ccp4.tar.bz2 -C /home/vagrant
mv /home/vagrant/ccp4-7.0 ccp4
cd /home/vagrant/ccp4
touch $HOME/.agree2ccp4v6
./BINARY.setup
chown -R vagrant:vagrant /home/vagrant/ccp4
