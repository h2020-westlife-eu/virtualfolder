#!/usr/bin/env bash
# 05.07.2016 added scipion software
apt-get install -y python-numpy openmpi-bin libopenmpi-dev
wget http://scipion.cnb.csic.es/m/static/install/scipion_v1.0.1_2016-06-30_linux64.tgz -O /home/vagrant/scipion.tgz
tar -xzf /home/vagrant/scipion.tgz -C /home/vagrant
cd /home/vagrant/scipion/
export MPI_LIBDIR=/usr/lib/openmpi/lib
export MPI_INCLUDE=/usr/lib/openmpi/include
export MPI_BINDIR=/usr/bin

./scipion config
