#!/usr/bin/env bash
# copy rc.local - custom script to start processes at boot
#touch /etc/rc.local
#cat /home/vagrant/bootstrap/rc.local >>/etc/rc.local
#chmod -R ugo+rwx /home/vagrant/scripts 
#chmod +x /etc/rc.local
#start the processes at first time - after that it will be started at boot
#/etc/rc.local
sed -i -e "s/\ExecStart.*$/ExecStart=\/home\/vagrant\/VRE-master\/runddevvre.sh/g" /etc/systemd/system/westlife-vre.service
sed -i -e "s/\ExecStart.*$/ExecStart=\/bin\/mono \/home\/vagrant\/MetadataService\/MetadataService.exe /g" /etc/systemd/system/westlife-metadata.service
chown -R vagrant:vagrant /home/vagrant/.westlife
service westlife-metadata start
service westlife-vre start

