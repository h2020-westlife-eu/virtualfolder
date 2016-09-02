#!/usr/bin/env bash
# 02.06.2016 replaced mysql by postgres
# install mono,  TODO reduce monodevelop to only needed packages

#apt-get install -y mono-complete
#apt-get install -y mono-devel

# install mysql
#sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password changeit'
#sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password changeit'
#sudo apt-get -y install mysql-server
#mysqladmin -u root --password=changeit create westlifewp6

# install postgresql
#apt-get install -y postgresql
yum -y install postgresql
service postgresql start

#set postgres password
sudo -u postgres psql template1 -c "ALTER USER postgres with encrypted password 'changeit';"
#sudo -u postgres createdb westlifewp6 default db is postgres

# build metadatservice
cp -R /vagrant/src /home/vagrant
xbuild /home/vagrant/src/WP6Service2/WP6Service2/MetadataService.csproj

#install VRE
wget -q https://github.com/h2020-westlife-eu/VRE/archive/master.zip
unzip master.zip
rm master.zip
cp /home/vagrant/VRE-master/static/img/westlife-logo.png /home/vagrant/.icons

#configure all needed packages by VRE
apt-get -y install redis-server nodejs supervisor uwsgi python-pip python-dev postgresql-server-dev-all libffi-dev
sudo -H pip install -U pip
sudo -H pip install virtualenv
cp -R /vagrant/VRE-master/* /home/vagrant/VRE-master
#cd /home/vagrant/VRE-master
#bash make_venv.sh
#source rc.sh
#python manage.py migrate
