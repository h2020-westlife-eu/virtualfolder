#!/usr/bin/env bash
# this script prepares web server, opens ports on firewall
# 02.06.2016 tomas - added WEBDAV & tiddlywiki for virtual folder documentation, probably more CMS should be supported
# 17.06.2016 tomas - added noninteractive for davfs2 in ubuntu1604
# 16.11.2016 tomas - added permission +x for SSI support
# install lamp
#sudo apt-get update
#sudo DEBIAN_FRONTEND=noninteractive apt-get -y install apache2 unzip libapache2-mod-encoding davfs2 inotify-tools php  libapache2-mod-php

# enable firewall
#ufw allow 22
#ufw allow 80
#ufw enable

#yum -y install firewalld
#sudo systemctl start firewalld
#firewall-cmd --zone=public --add-port=80/tcp --permanent
#firewall-cmd --zone=public --add-port=22/tcp --permanent
#firewall-cmd --zone=public --add-port=8890/tcp --permanent
#firewall-cmd --zone=public --add-port=1111/tcp --permanent
# could firewall-cmd --zone=public --add-port=80/tcp --permanent
#firewall-cmd --reload

# prepare and restart apache, rewrite configuration
cp -R $WP6SRC/apache2/sites-available/* /etc/httpd/conf.d
cp -R $WP6SRC/www/* /var/www/html

#unzip $WP6SRC/thirdparty/ngl.zip -d /var/www
#sudo cp $WP6SRC/index.html /var/www
#rm /var/www/html/dokuwiki/install.php
chown -R apache:apache /var/www/html
chmod -R 707 /var/www/html/

#add +x permission on all html files which has include directive
chmod ugo+x `grep -rl '/var/www/html' -e "<\!--\#include"`


yum -y install epel-release
yum repolist
yum -y install davfs2 mod_proxy_html

systemctl start httpd
systemctl enable httpd

# share work directory via webdav - may be used to directly pass and process data
mkdir /home/vagrant/work
#chown vagrant:vagrant /home/vagrant/work
# dir for local copy (owncloud synchronized)
#mkdir /home/vagrant/b2drop
#chown vagrant:vagrant /home/vagrant/b2drop
# dir for logs
mkdir /home/vagrant/logs
chown apache:apache /home/vagrant/work
#adding vagrant and apache into davfs2 group
usermod -a -G davfs2 vagrant
usermod -a -G davfs2 apache

# download and install b2drop webdav connection
# TODO will be done by dokuwiki plugin

# mount b2drop
# TODO optional will be done by dokuwiki plugin - if needed
#mkdir /home/vagrant/.davfs
#copy script for mounting B2DROP and setting root SetUID bit
#fromdos /home/vagrant/mountb2drop.sh
#cp $WP6SRC/mountb2drop.sh /home/vagrant
cp -R $WP6SRC/scripts /home/vagrant/scripts
dos2unix /home/vagrant/scripts/*
chmod ugo+x /home/vagrant/scripts/*

chown root:root /home/vagrant/scripts/mountb2drop.sh
chmod 4755 /home/vagrant/scripts/mountb2drop.sh
if  grep -q MOUNTB2 /etc/sudoers; then
  echo sudoers already provisioned
else
  cat /home/vagrant/scripts/sudoers >>/etc/sudoers
  #chmod 0440 /etc/sudoers
fi

#PHP plugin will make a secrets file and execute the mountb2drop.sh script
touch /home/vagrant/secrets
touch /home/vagrant/secrets_oc
chown apache:apache /home/vagrant/secrets /home/vagrant/secrets_oc

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
  #echo "writing to configuration proxy setting, proxyhost: $proxyhost  proxyport: $proxyport"
  #echo "\$conf['proxy']['host'] = $proxyhost;" >> /var/www/html/dokuwiki/conf/local.php
  #echo "\$conf['proxy']['port'] = $proxyport;" >> /var/www/html/dokuwiki/conf/local.php
fi
