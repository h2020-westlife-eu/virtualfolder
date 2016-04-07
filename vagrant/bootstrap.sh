#!/usr/bin/env bash
# install lamp
sudo apt-get update
sudo apt-get install -y apache2 php5  libapache2-mod-php5 unzip libapache2-mod-encoding davfs2 tofrodos inotify-tools

# download dokuwiki / prototype web
wget -q http://download.dokuwiki.org/src/dokuwiki/dokuwiki-stable.tgz
tar xvf dokuwiki-stable.tgz
sudo mv dokuwiki-*/ /var/www/dokuwiki/

# download dokuwiki plugin WRAP
wget -q https://github.com/selfthinker/dokuwiki_plugin_wrap/archive/stable.zip
unzip stable.zip
sudo mv dokuwiki_plugin* /var/www/dokuwiki/lib/plugins/wrap
rm stable.zip

# download dokuwiki plugin Bureaucracy
wget -q https://github.com/splitbrain/dokuwiki-plugin-bureaucracy/zipball/master
unzip master
sudo mv splitbrain* /var/www/dokuwiki/lib/plugins/bureaucracy
rm master

# download dokuwiki plugin directorylist
wget -q https://github.com/alexwenzel/dokuwiki-plugin-directorylist/archive/master.zip
unzip master.zip
sudo mv dokuwiki-plugin* /var/www/dokuwiki/lib/plugins/directorylist
rm master.zip

# download dokuwiki plugin pagemod
wget -q https://github.com/rendezz/dokuwiki-pagemod/archive/master.zip
unzip master.zip
sudo mv dokuwiki-pagemod* /var/www/dokuwiki/lib/plugins/pagemod
rm master.zip

# download dokuwiki plugin include
wget -q https://github.com/dokufreaks/plugin-include/tarball/master
tar -xzf master
sudo mv dokufreaks-* /var/www/dokuwiki/lib/plugins/include
rm master

# download dokuwiki plugin pdb
wget -q https://github.com/iobataya/dokuwiki-plugin-pdb/archive/master.zip
unzip master.zip
sudo mv dokuwiki-plugin-pdb-* /var/www/dokuwiki/lib/plugins/pdb
rm master.zip

# download owncloud client
sudo sh -c "echo 'deb http://download.opensuse.org/repositories/isv:/ownCloud:/desktop/Ubuntu_12.04/ /' >> /etc/apt/sources.list.d/owncloud-client.list"
sudo apt-get update
sudo apt-get install -y --force-yes owncloud-client

# prepare and restart apache, rewrite configuration
sudo cp -R /vagrant/apache2 /etc
sudo cp -R /vagrant/www/* /var/www
unzip /vagrant/thirdparty/ngl.zip -d /var/www
#sudo cp /vagrant/index.html /var/www
sudo rm /var/www/dokuwiki/install.php
sudo chown -R www-data:www-data /var/www/dokuwiki
sudo chown -R www-data:www-data /var/www/ngl
sudo chmod -R 707 /var/www/dokuwiki
sudo a2enmod dav
sudo a2enmod dav_fs
sudo service apache2 restart

## TODO create dokuwiki.conf inspired by https://techknight.eu/2015/06/19/setup-dokuwiki-ubuntu-14-04-lamp/
## cp /etc/apache2/sites-available/000-default.conf dokuwiki.conf

# share work directory via webdav - may be used to directly pass and process data
mkdir /home/vagrant/work
chown vagrant:vagrant /home/vagrant/work
# dir for local copy (owncloud synchronized)
mkdir /home/vagrant/b2drop
chown vagrant:vagrant /home/vagrant/b2drop
# dir for logs
mkdir /home/vagrant/logs
sudo chown www-data:www-data /home/vagrant/work
sudo usermod -a -G davfs2 vagrant

# download and install b2drop webdav connection
# TODO will be done by dokuwiki plugin

# mount b2drop
# TODO optional will be done by dokuwiki plugin - if needed
#mkdir /home/vagrant/.davfs
#copy script for mounting B2DROP and setting root SetUID bit
fromdos /vagrant/mountb2drop.sh
cp /vagrant/mountb2drop.sh /home/vagrant
sudo chown root:root /home/vagrant/mountb2drop.sh
sudo chmod 4755 /home/vagrant/mountb2drop.sh
fromdos /vagrant/scripts/*
sudo cp /vagrant/scripts/sudoers /etc/sudoers
sudo chmod 0440 /etc/sudoers
#fromdos /vagrant/scripts/*
cp -R /vagrant/scripts /home/vagrant

#PHP plugin will make a secrets file and execute the mountb2drop.sh script
touch /home/vagrant/secrets
touch /home/vagrant/secrets_oc
sudo chown www-data:www-data /home/vagrant/secrets /home/vagrant/secrets_oc

# set proxy for davfs - as it seems not taking the http_proxy environment variable
if [ -z "$http_proxy" ]; then echo "proxy is not set"; else
  echo "proxy is set to '$http_proxy'"
  #strip http:// from the variable
  davs_http_proxy=${http_proxy:7}
  echo "proxy $davs_http_proxy" >> /etc/davfs2/davfs2.conf
  echo "ask_auth    0" >> /etc/davfs2/davfs2.conf

fi

# download ccp4, configure and install
wget -q ftp://ftp.ccp4.ac.uk/ccp4/current/ccp4-7.0-linux-x86_64.tar.bz2
tar -xjf ccp4-7.0-linux-x86_64.tar.bz2
mv ccp4-7.0 ccp4
cd /home/vagrant/ccp4
touch $HOME/.agree2ccp4v6
./BINARY.setup
chown -R vagrant:vagrant /home/vagrant/ccp4
