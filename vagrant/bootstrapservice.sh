#!/usr/bin/env bash
# install mono, TODO reduce monodevelop to only needed packages
sudo apt-get -y install mono-complete
# install mysql
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password changeit'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password changeit'
sudo apt-get -y install mysql-server
mysqladmin -u root --password=changeit create westlifewp6

# build metadatservice
cp -R /vagrant/src /home/vagrant
xbuild /home/vagrant/src/WP6Service2/WP6Service2/MetadataService.csproj

