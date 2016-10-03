#!/usr/bin/env bash
# copy rc.local - custom script to start processes at boot
cat /home/vagrant/bootstrap/rc.local >>/etc/rc.d/rc.local
#start the processes at first time - after that it will be started at boot
/etc/rc.local
