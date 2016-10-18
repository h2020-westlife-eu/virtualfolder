#!/usr/bin/env bash
# copy rc.local - custom script to start processes at boot
touch /etc/rc.local
cat /home/vagrant/bootstrap/rc.local >>/etc/rc.local
chmod -R ugo+rwx /home/vagrant/scripts 
chmod +x /etc/rc.local
#start the processes at first time - after that it will be started at boot
/etc/rc.local
