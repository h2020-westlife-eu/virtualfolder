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
#service postgresql start
yum -y install postgresql-server postgresql-contrib
postgresql-setup initdb
#allow postgresql md5 authentication
gawk '{gsub(/ident/,"md5",$5); print}' /var/lib/pgsql/data/pg_hba.conf > pg_hba_new.conf
mv pg_hba_new.conf /var/lib/pgsql/data/pg_hba.conf

#start postgresql
systemctl start postgresql
systemctl enable postgresql
#set default db account password
sudo -u postgres psql template1 -c "ALTER USER postgres with encrypted password 'changeit';"

#install mono
#remove default mono
#yum -y remove mono-* monodoc
#install mono repository
#yum -y --installroot=/opt/tools/latest/ install yum-utils
#rpm --import "http://keyserver.ubuntu.com/pks/lookup?op=get&search=0x3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF"
#yum-config-manager --add-repo http://download.mono-project.com/repo/centos/
#yum -y install --installroot=/opt/tools/latest/ mono-devel
#install nuget package tool
#sudo yum -y --nogpgcheck --installroot=/opt/tools/latest/ install nuget
#fix mono configuration
#sed -i '{s/\$mono_libdir/\/usr\/lib64/}' /opt/tools/latest/etc/mono/config

# build metadataservice
cp -R /vagrant/src /home/vagrant
# download depended nuget packages DLL
wget https://nuget.org/nuget.exe
source /cvmfs/west-life.egi.eu/tools/mono/mono-dev-env
mono nuget.exe restore /home/vagrant/src/WP6Service2/WP6Service2.sln
# build project EXEcutable
xbuild /home/vagrant/src/WP6Service2/WP6Service2/MetadataService.csproj

#install VRE
wget -q https://github.com/h2020-westlife-eu/VRE/archive/master.zip
unzip master.zip
rm master.zip
cp /home/vagrant/VRE-master/static/img/westlife-logo.png /home/vagrant/.icons

#configure all needed packages by VRE
#apt-get -y install redis-server nodejs supervisor uwsgi python-pip python-dev postgresql-server-dev-all libffi-dev
yum -y install redis nodejs supervisor uwsgi python-pip python-devel postgresql-devel libffi-devel
sudo -H pip install -U pip
sudo -H pip install virtualenv
cp -R /vagrant/VRE-master/* /home/vagrant/VRE-master
#cd /home/vagrant/VRE-master
#bash make_venv.sh
#source rc.sh
#python manage.py migrate
