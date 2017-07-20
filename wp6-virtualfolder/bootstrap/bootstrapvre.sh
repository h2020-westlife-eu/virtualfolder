#!/usr/bin/env sh

#install VRE sources
git clone https://github.com/h2020-westlife-eu/VRE.git
cd VRE
git checkout dev
cd ..
mv VRE VRE-master
cp $WP6SRC/VRE-master/rundevvre.sh /home/vagrant/VRE-master
cp $WP6SRC/VRE-master/addvagrantuser.py /home/vagrant/VRE-master

#wget -q https://github.com/h2020-westlife-eu/VRE/archive/master.zip
#unzip -q master.zip
#rm master.zip
cp /home/vagrant/VRE-master/static/img/westlife-logo.png /home/vagrant/.icons

#configure all needed packages by VRE
yum -y install gcc openssl-devel python-virtualenv python-pip python-redis nodejs-supervisor python-devel libffi-devel
#not needed when cloning from dev branch
#cp -R $WP6SRC/VRE-master/* /home/vagrant/VRE-master
# Prepares development version of VRE
cd /home/vagrant/VRE-master
bash make_venv.sh
cd /home/vagrant/VRE-master
source ./rc.sh
python manage.py migrate
python addvagrantuser.py