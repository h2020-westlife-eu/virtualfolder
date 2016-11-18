#!/usr/bin/env sh

#install VRE
wget -q https://github.com/h2020-westlife-eu/VRE/archive/master.zip
unzip -q master.zip
rm master.zip
cp /home/vagrant/VRE-master/static/img/westlife-logo.png /home/vagrant/.icons

#configure all needed packages by VRE
#apt-get -y install redis-server nodejs supervisor uwsgi python-pip python-dev postgresql-server-dev-all libffi-dev
yum -y install python-virtualenv python-pip python-redis nodejs-supervisor python-devel libffi-devel
#sudo -H pip install -U pip
#sudo -H pip install virtualenv
#cp -R $WP6SRC/VRE-master/* /home/vagrant/VRE-master
#cd /home/vagrant/VRE-master
#bash make_venv.sh
#source rc.sh
#python manage.py migrate
