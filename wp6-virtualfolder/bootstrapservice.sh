#!/usr/bin/env bash
# 02.06.2016 replaced mysql by postgres
# install mono,  TODO reduce monodevelop to only needed packages
sudo apt-get -y install mono-complete
# install mysql
#sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password changeit'
#sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password changeit'
#sudo apt-get -y install mysql-server
#mysqladmin -u root --password=changeit create westlifewp6

# install postgresql
sudo apt-get -y install postgresql
sudo service postgresql start

#set postgres password
sudo -u postgres psql template1 -c "ALTER USER postgres with encrypted password 'changeit';"
#sudo -u postgres createdb westlifewp6 default db is postgres

# build metadatservice
cp -R /vagrant/src /home/vagrant
xbuild /home/vagrant/src/WP6Service2/WP6Service2/MetadataService.csproj
