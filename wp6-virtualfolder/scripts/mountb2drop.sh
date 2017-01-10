#!/usr/bin/env bash
# This scripts mounts /home/vagrant/work/b2drop as davfs to b2drop.eudat.eu
# and configures proxy of http://localhost/webdav/b2drop to use encoded auth
# Usage:
# - mountb2drop.sh [alias]
# - where [alias] is name of subdirectroy under which the webdav is mounted
# - the secrets file for davfs in format [directory] [username] [password] is at /home/vagrant/.westlife/secrets[alias]
# - the secrets file in format user:password in /home/vagrant/.westlife/secrets2[alias]
# Output:
# - /home/vagrant/work/b2drop mounted using davfs2
# - proxy configured to use user credentials passed to b2drop.eudat.eu
#
# 24.05.2016 tomas - changed directory structure, all mounts will be subdir of 'work', comment owncloudcmd
whoami 1>&2
#create directory if not created
umount /home/vagrant/work/$1
mkdir -p /home/vagrant/work/$1
# allow browsing for apache user the work dir
chown -R apache /home/vagrant/work
chmod o+x /home/vagrant
#mount work folder via webdav to b2drop
#kill all previous b2dropsync and xiacont
#killall /bin/sh

#move secrets from temporary files and mount
cp /home/vagrant/.westlife/secrets$1 /etc/davfs2/secrets
chown root:root /etc/davfs2/secrets
chmod 600 /etc/davfs2/secrets
chmod ugo+rx /var/log/httpd
echo http_proxy: $http_proxy
echo https_proxy: $https_proxy
#first mount
status=0
mount.davfs https://b2drop.eudat.eu/remote.php/webdav /home/vagrant/work/$1 || status=1
#second attemp mount, sometimes having https_proxy seems not working with davfs
if [ $status -ne 0 ]
then
  echo "first mount failed, second attemp"
  unset https_proxy
  mount.davfs https://b2drop.eudat.eu/remote.php/webdav /home/vagrant/work/$1
fi
#configure reverse proxy for webdav in apache
#encode base64 authentication string and pass it to header where "Basic ...." is already been placed
SFILE2=/home/vagrant/.westlife/secrets2$1
echo $SFILE
if [ -e $SFILE2 ]
  then
  AUTH="$(base64 $SFILE2)"
  echo $AUTH
  sed -i -e "s/\"Basic [^\"]*/\"Basic ${AUTH}/g" /etc/httpd/conf.d/000-default.conf
  service httpd reload
  #rm /home/vagrant/.westlife/secrets2
fi
