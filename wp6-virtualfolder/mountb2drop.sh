#!/usr/bin/env bash
whoami 1>&2
#mount work folder via webdav to b2drop
umount /home/vagrant/work
#kill all previous b2dropsync and xiacont
killall /bin/sh
cp /home/vagrant/secrets /etc/davfs2/secrets
chown root:root /etc/davfs2/secrets
chmod 600 /etc/davfs2/secrets
chmod ugo+x /var/log/apache2/error.log
mount.davfs https://b2drop.eudat.eu/remote.php/webdav /home/vagrant/work
#start owncloud synchronization of local copy
sudo -u vagrant nohup /home/vagrant/scripts/b2dropsync.sh > /home/vagrant/logs/b2drop.log 2>&1 &
sudo -u vagrant nohup /home/vagrant/scripts/xiacont.sh > /home/vagrant/logs/xia.log 2>&1 &

