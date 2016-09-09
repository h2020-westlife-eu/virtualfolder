#!/usr/bin/env bash
yum -y install neon-devel
wget http://download.savannah.gnu.org/releases/davfs2/davfs2-1.5.4.tar.gz -O /home/vagrant/src/davfs2-1.5.4.tar.gz
yum -y remove davfs2
cd /home/vagrant/src
tar -xzf davfs2-1.5.4.tar.gz
cd davfs2-1.5.4
./configure
make
make install
