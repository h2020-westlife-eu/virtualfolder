#!/usr/bin/env bash
# copy rc.local - custom script to start processes at boot
#touch /etc/rc.local
#cat /home/vagrant/bootstrap/rc.local >>/etc/rc.local
#chmod -R ugo+rwx /home/vagrant/scripts 
#chmod +x /etc/rc.local
#start the processes at first time - after that it will be started at boot
#/etc/rc.local
sed -i -e "s/\ExecStart.*$/ExecStart=\/home\/vagrant\/VRE-master\/rundevvre.sh/g" /etc/systemd/system/westlife-vre.service
sed -i -e "s/^\(WorkingDirectory\s*=\s*\).*$/\1\/home\/vagrant\/VRE-master/g" /etc/systemd/system/westlife-vre.service
sed -i -e "s/\ExecStart.*$/ExecStart=\/bin\/mono \/home\/vagrant\/MetadataService\/MetadataService.exe/g" /etc/systemd/system/westlife-metadata.service
sed -i -e "s/^\(WorkingDirectory\s*=\s*\).*$/\1\/home\/vagrant/g" /etc/systemd/system/westlife-metadata.service
chown -R vagrant:vagrant /home/vagrant/.westlife

# SELinux setting, allow proxy from apache to other services and security context to dir
if hash setsebool 2>/dev/null; then
  setsebool -P httpd_can_network_connect 1
  chcon -R --reference=/var/www $WP6SRC/www
  firewall-cmd --zone=public --add-port=80/tcp --permanent
  firewall-cmd --reload
fi
service httpd start
service westlife-metadata start
service westlife-vre start

