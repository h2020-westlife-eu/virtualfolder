#!/usr/bin/env bash
# copy rc.local - custom script to start processes at boot
fromdos /home/vagrant/rc.local
cp /home/vagrant/rc.local /etc/rc.local
#start the processes at first time - after that it will be started at boot
/etc/rc.local
service lightdm restart

