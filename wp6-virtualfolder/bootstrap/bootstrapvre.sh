#!/usr/bin/env sh

#install VRE sources
git clone https://github.com/h2020-westlife-eu/VRE.git
cd VRE
git checkout dev
cd ..
mv VRE VRE-master

#wget -q https://github.com/h2020-westlife-eu/VRE/archive/master.zip
#unzip -q master.zip
#rm master.zip
cp /home/vagrant/VRE-master/static/img/westlife-logo.png /home/vagrant/.icons

#configure all needed packages by VRE
yum -y install python-virtualenv python-pip python-redis nodejs-supervisor python-devel libffi-devel
#not needed when cloning from dev branch
#cp -R $WP6SRC/VRE-master/* /home/vagrant/VRE-master
# Prepares development version of VRE
cd /home/vagrant/VRE-master
bash make_venv.sh
source rc.sh
python manage.py migrate