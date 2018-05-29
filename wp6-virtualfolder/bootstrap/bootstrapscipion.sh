#!/usr/bin/env bash
# 05.07.2016 added scipion software
# commented all except mpi, scipion distributed via cvmfs
#apt-get install -y python-numpy python-tk python-sqlite openmpi-bin libopenmpi-dev software-properties-common
#yum -y install python-numpy python-tk python-sqlite openmpi-bin libopenmpi-dev software-properties-common
#yum -y install openmpi openmpi-devel
# fix issue with mpic++ not found
export PATH=$PATH;/cvmfs/west-life.egi.eu/tools/openmpi/1.6.5/bin
sudo -E -i -u vagrant /cvmfs/west-life.egi.eu/software/scipion/latest/scipion config

mkdir -p /home/vagrant/.config/scipion/myfirstmap
mkdir -p /home/vagrant/.config/scipion/mymovies
mkdir -p /home/vagrant/.config/scipion/myresmap
mkdir -p /home/vagrant/.config/scipion/firstmap
mkdir -p /home/vagrant/.config/scipion/movies
mkdir -p /home/vagrant/.config/scipion/resmap

mkdir -p /home/vagrant/ScipionUserData/data/tests
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/myfirstmap
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/mymovies
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/myresmap
chown -R vagrant:vagrant /home/vagrant/.config
chown -R vagrant:vagrant /home/vagrant/ScipionUserData
cp $WP6SRC/Desktop/scipion* /home/vagrant/Desktop
chmod ugo+x /home/vagrant/Desktop/*
