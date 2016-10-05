#!/usr/bin/env bash
# 05.07.2016 added scipion software
#apt-get install -y python-numpy python-tk python-sqlite openmpi-bin libopenmpi-dev software-properties-common
#yum -y install python-numpy python-tk python-sqlite openmpi-bin libopenmpi-dev software-properties-common
yum -y install openmpi openmpi-devel
#install java-8, silently

#apt-add-repository -y ppa:webupd8team/java
#apt-get update

#echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections
#echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections
#apt-get -y -qq install oracle-java8-installer
#update-java-alternatives -s java-8-oracle
#apt-get install -y -qq oracle-java8-set-default

#install scipion
#echo downloading SCIPION
wget -q http://scipion.cnb.csic.es/m/static/install/scipion_v1.0.1_2016-06-30_linux64.tgz -O /home/vagrant/scipion.tgz
tar -xzf /home/vagrant/scipion.tgz -C /home/vagrant
cd /home/vagrant/scipion/

#change owner, otherwise tests will fail for permission denied
chown -R vagrant:vagrant /home/vagrant/scipion
sudo -i -u vagrant export MPI_LIBDIR=/usr/lib64/openmpi/lib;export MPI_INCLUDE=/usr/src/debug/openmpi-1.6.4/ompi/include;export MPI_BINDIR=/usr/lib64/openmpi/bin;/home/vagrant/scipion/scipion config
