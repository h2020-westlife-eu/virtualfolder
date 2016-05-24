#!/usr/bin/env bash
#24.05.2016 tomas - changed directory structure, all mounts will be subdir of 'work', comment owncloudcmd
whoami 1>&2
#create directory if not created 
mkdir -p /home/vagrant/work/b2drop
chown www-data /home/vagrant/work
#mount work folder via webdav to b2drop
umount /home/vagrant/work/b2drop
#kill all previous b2dropsync and xiacont
killall /bin/sh
mv /home/vagrant/secrets /etc/davfs2/secrets
chown root:root /etc/davfs2/secrets
chmod 600 /etc/davfs2/secrets
chmod ugo+rx /var/log/apache2
mount.davfs https://b2drop.eudat.eu/remote.php/webdav /home/vagrant/work/b2drop
#chown -R www-data:www-data /home/vagrant/work
#start owncloud synchronization of local copy
#sudo -u vagrant nohup /home/vagrant/scripts/b2dropsync.sh > /home/vagrant/logs/b2drop.log 2>&1 &
#sudo -u vagrant nohup /home/vagrant/scripts/xiacont.sh > /home/vagrant/logs/xia.log 2>&1 &

