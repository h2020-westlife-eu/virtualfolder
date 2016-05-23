#!/usr/bin/env bash
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
sudo a2enmod proxy_http
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
  proxyhostport=${http_proxy#*http://}
  proxyport=${proxyhostport#*:}
  proxyhost=${proxyhostport%:*}
  echo "writing to configuration proxy setting, proxyhost: $proxyhost  proxyport: $proxyport"
  echo "\$conf['proxy']['host'] = $proxyhost;" >> /var/www/dokuwiki/conf/local.php
  echo "\$conf['proxy']['port'] = $proxyport;" >> /var/www/dokuwiki/conf/local.php
fi

