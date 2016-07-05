#!/usr/bin/env bash
# prepare and restart apache, rewrite configuration
cp -R /vagrant/apache2 /etc
cp -R /vagrant/www/* /var/www
unzip /vagrant/thirdparty/ngl.zip -d /var/www
#sudo cp /vagrant/index.html /var/www
rm /var/www/dokuwiki/install.php
chown -R www-data:www-data /var/www
#sudo chmod -R 707 /var/www/dokuwiki
a2enmod dav
a2enmod dav_fs
a2enmod proxy_http
a2enmod php
a2enmod proxy_html
service apache2 restart

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
#fromdos /home/vagrant/mountb2drop.sh
#cp /vagrant/mountb2drop.sh /home/vagrant
chown root:root /home/vagrant/mountb2drop.sh
chmod 4755 /home/vagrant/mountb2drop.sh
cp -R /vagrant/scripts /home/vagrant/scripts
fromdos /home/vagrant/scripts/*
cp /home/vagrant/scripts/sudoers /etc/sudoers
chmod 0440 /etc/sudoers

#PHP plugin will make a secrets file and execute the mountb2drop.sh script
touch /home/vagrant/secrets
touch /home/vagrant/secrets_oc
chown www-data:www-data /home/vagrant/secrets /home/vagrant/secrets_oc

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
