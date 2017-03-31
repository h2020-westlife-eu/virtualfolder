#!/usr/bin/env bash
# 05.07.2016 added scipion software
# commented all except mpi, scipion distributed via cvmfs
#apt-get install -y python-numpy python-tk python-sqlite openmpi-bin libopenmpi-dev software-properties-common
#yum -y install python-numpy python-tk python-sqlite openmpi-bin libopenmpi-dev software-properties-common
yum -y install openmpi openmpi-devel
# fix issue with mpic++ not found
export PATH=$PATH;/usr/lib64/openmpi/bin

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
#download 28MB web-master
wget --quiet https://github.com/I2PC/scipion-web/archive/web-master.zip
unzip web-master.zip
mv scipion-web-web-master scipion
# change config files to point SL7.2 specific openmpi and logging to tmp
cd scipion
sed -i -e 's/MPI_LIBDIR.*$/MPI_LIBDIR=\/usr\/lib64\/openmpi\/lib/g' /home/vagrant/scipion/config/scipion.conf
sed -i -e 's/MPI_INCLUDE.*$/MPI_INCLUDE=\/usr\/include\/openmpi-x86_64/g' /home/vagrant/scipion/config/scipion.conf
sed -i -e 's/MPI_BINDIR.*$/MPI_BINDIR=\/usr\/lib64\/openmpi\/bin/g' /home/vagrant/scipion/config/scipion.conf
sed -i -e 's/JAVA_HOME.*$/JAVA_HOME=\/usr\/lib\/jvm\/java-1.8.0/g' /home/vagrant/scipion/config/scipion.conf
sed -i -e 's/SCIPION_TESTS.*$/SCIPION_TESTS=~\/ScipionUserData\/data/\tests/g' /home/vagrant/scipion/config/scipion.conf
sed -i -e 's/WEB_LOG_FILE.*$/WEB_LOG_FILE'', ''\/tmp\/scipion_web_tools.log'')/g' /home/vagrant/scipion/pyworkflows/config.py
# copy hosts.conf to .config
mkdir -p /home/vagrant/.config/scipion/myfirstmap
mkdir -p /home/vagrant/.config/scipion/mymovies
mkdir -p /home/vagrant/.config/scipion/myresmap
cp /home/vagrant/scipion/config/hosts.conf /home/vagrant/.config/scipion/myfirstmap
cp /home/vagrant/scipion/config/hosts.conf /home/vagrant/.config/scipion/mymovies
cp /home/vagrant/scipion/config/hosts.conf /home/vagrant/.config/scipion/myresmap
# compile and install
./scipion config 
./scipion install -j 2
./scipion install bsoft-1.8.8 bsoft-1.9.0 chimera ctffind ctffind4 dogpicker eman2.11 eman2.12 frealign gEMpicker_v1.1 motioncorr relion-1.3 relion-1.4 relion-1.4_float resmap simple spider summovie unblur --no-xmipp
./scipion webserver collectstatic
chown -R vagrant:vagrant /home/vagrant/scipion
chown -R vagrant:vagrant /home/vagrant/.config/scipion
#sudo -E -i -u vagrant /home/vagrant/scipion/scipion config
