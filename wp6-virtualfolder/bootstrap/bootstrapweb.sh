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
# copy all system config to etc
cp -R $WP6SRC/conf-template/* /
#one of the configuration is syslog - need to restart
service rsyslog restart
WP6SRCESC=$(echo $WP6SRC | sed 's_/_\\/_g')
sed -i -e "s/\/cvmfs\/west-life.egi.eu\/software\/virtualfolder\/latest\/www/${WP6SRCESC}\/www/g" /etc/httpd/conf.d/000-default.conf

# copy web app pages
#cp $WP6SRC/www/* /var/www/html
#cp -R $WP6SRC/www/css /var/www/html
#cp -R $WP6SRC/www/img /var/www/html
#cp -R $WP6SRC/www/scripts /var/www/html
#cp -R $WP6SRC/www/services2 /var/www/html
#cp -R $WP6SRC/www/src /var/www/html
#cp -R $WP6SRC/www/tools /var/www/html


#unzip $WP6SRC/thirdparty/ngl.zip -d /var/www
#sudo cp $WP6SRC/index.html /var/www
#rm /var/www/html/dokuwiki/install.php
chown -R apache:apache /var/www/html
chmod -R 644 /var/www/html
find /var/www/html -type d -exec chmod ugo+rx {} \;

#add +x permission on all html files which has include directive
chmod ugo+x `grep -rl '/var/www/html' -e "<\!--\#include"`

echo Adding EPEL repository
echo Warning: This operation might be slown down by repeating requests to SL servers.
echo minrate=10 >> /etc/yum.conf
echo timeout=60 >> /etc/yum.conf
yum -y install epel-release
yum-config-manager --save --setopt=epel/x86_64/metalink.skip_if_unavailable=true
yum repolist
yum -y install davfs2 --skip-broken 
yum -y install mod_proxy_html --skip-broken 
yum -y install mod_ssl --skip-broken 
yum -y install dos2unix --skip-broken

systemctl start httpd
systemctl enable httpd

# share work directory via webdav - may be used to directly pass and process data
mkdir /srv/virtualfolder
chmod ugo+rwx /srv/virtualfolder
#add permission to allow browse webdav content in /srv/virtualfolder
chmod go+rx /home/vagrant
# workaround issue #6 store some config 
mkdir /etc/westlife

#chown vagrant:vagrant /srv/virtualfolder
# dir for local copy (owncloud synchronized)
#mkdir /home/vagrant/b2drop
#chown vagrant:vagrant /home/vagrant/b2drop
# dir for logs
mkdir -p /srv/virtualfolder/logs
chown apache:apache /srv/virtualfolder
#adding vagrant and apache into davfs2 group
usermod -a -G davfs2 vagrant
usermod -a -G davfs2 apache
# set the default group of user vagrant to davfs2, to be able to mount
usermod -g davfs2 vagrant

# download and install b2drop webdav connection
ln -s $WP6SRC/scripts /home/vagrant/scripts

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

# set proxy for davfs - as it seems not taking the http_proxy environment variable

if [ -z "$http_proxy" ]; then echo "proxy is not set"; else
  echo "proxy is set to '$http_proxy'"
  # set proxy for redirecting the webdav traffic
  # TODO interprets


  #strip http:// from the variable
  davs_http_proxy=${http_proxy:7}
  echo "proxy $davs_http_proxy" >> /etc/davfs2/davfs2.conf
  echo "ask_auth    0" >> /etc/davfs2/davfs2.conf
  proxyhostport=${http_proxy#*http://}
  proxyport=${proxyhostport#*:}
  proxyhost=${proxyhostport%:*}

  sed -i -e "s/\#ProxyRemoteMatch.*$/ProxyRemoteMatch https:\/\/b2drop.eudat.eu\* http:\/\/${proxyhostport}/g" 000-default.conf

  #echo "writing to configuration proxy setting, proxyhost: $proxyhost  proxyport: $proxyport"
  #echo "\$conf['proxy']['host'] = $proxyhost;" >> /var/www/html/dokuwiki/conf/local.php
  #echo "\$conf['proxy']['port'] = $proxyport;" >> /var/www/html/dokuwiki/conf/local.php
fi
