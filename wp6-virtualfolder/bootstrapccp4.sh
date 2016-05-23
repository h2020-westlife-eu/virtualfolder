#!/usr/bin/env bash
# download ccp4, configure and install
wget -q ftp://ftp.ccp4.ac.uk/ccp4/current/ccp4-7.0-linux-x86_64.tar.bz2
tar -xjf ccp4-7.0-linux-x86_64.tar.bz2
mv ccp4-7.0 ccp4
cd /home/vagrant/ccp4
touch $HOME/.agree2ccp4v6
./BINARY.setup
chown -R vagrant:vagrant /home/vagrant/ccp4