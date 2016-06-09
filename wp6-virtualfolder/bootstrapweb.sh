#!/usr/bin/env bash
# 02.06.2016 tomas - added WEBDAV & tiddlywiki for virtual folder documentation, probably more CMS should be supported
# install lamp
sudo apt-get update
sudo apt-get install -y apache2 unzip libapache2-mod-encoding davfs2 inotify-tools php5  libapache2-mod-php5

# enable firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw enable

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


