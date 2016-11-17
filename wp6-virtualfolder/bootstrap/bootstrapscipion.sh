#!/usr/bin/env bash
# 05.07.2016 added scipion software
# commented all except mpi, scipion distributed via cvmfs
#apt-get install -y python-numpy python-tk python-sqlite openmpi-bin libopenmpi-dev software-properties-common
#yum -y install python-numpy python-tk python-sqlite openmpi-bin libopenmpi-dev software-properties-common
yum -y install openmpi openmpi-devel
sudo -E -i -u vagrant /cvmfs/west-life.egi.eu/software/scipion/latest/scipion config

mkdir -p /home/vagrant/.config/scipion/myfirstmap
mkdir -p /home/vagrant/.config/scipion/mymovies
mkdir -p /home/vagrant/.config/scipion/myresmap
mkdir -p /home/vagrant/ScipionUserData/data/tests
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/myfirstmap
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/mymovies
cp /cvmfs/west-life.egi.eu/software/scipion/latest/scipion/config/hosts.conf /home/vagrant/.config/scipion/myresmap

cp $WP6SRC/Desktop/scipion* /home/vagrant/Desktop
chmod ugo+x /home/vagrant/Desktop/*
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
#wget -q http://scipion.cnb.csic.es/m/static/install/scipion_v1.0.1_2016-06-30_linux64.tgz -O /home/vagrant/scipion.tgz
#tar -xzf /home/vagrant/scipion.tgz -C /home/vagrant
#cd /home/vagrant/scipion/

#change owner, otherwise tests will fail for permission denied
#chown -R vagrant:vagrant /home/vagrant/scipion
#sed -i -e 's/MPI_LIBDIR.*$/MPI_LIBDIR=\/usr\/lib64\/openmpi\/lib/g' /home/vagrant/scipion/config/scipion.conf
#sed -i -e 's/MPI_INCLUDE.*$/MPI_INCLUDE=\/usr\/src\/debug\/openmpi-1.6.4\/ompi\/include/g' /home/vagrant/scipion/config/scipion.conf
#sed -i -e 's/MPI_BINDIR.*$/MPI_BINDIR=\/usr\/lib64\/openmpi\/bin/g' /home/vagrant/scipion/config/scipion.conf
#sudo -E -i -u vagrant /home/vagrant/scipion/scipion config
