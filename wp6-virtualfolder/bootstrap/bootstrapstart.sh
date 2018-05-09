#!/usr/bin/env bash
export WP6SRCESC=$(echo $WP6SRC | sed 's_/_\\/_g')
export VREESC= $(echo $VREDIR | sed 's_/_\\/_g')
sed -i -e "s/\ExecStart.*$/ExecStart=${VREESC}\/VRE-master\/rundevvre.sh/g" /etc/systemd/system/westlife-vre.service
sed -i -e "s/^\(WorkingDirectory\s*=\s*\).*$/\1${VREESC}\/VRE-master/g" /etc/systemd/system/westlife-vre.service
sed -i -e "s/\ExecStart.*$/ExecStart=\/bin\/mono \/opt\/virtualfolder\/MetadataService\/MetadataService.exe/g" /etc/systemd/system/westlife-metadata.service
chown -R vagrant:vagrant /home/vagrant
chown -R vagrant:vagrant ${WP6SRC}
chown -R vagrant:vagrant ${VREDIR}

#db files readable by vagrant user only
mkdir -p /var/lib/westlife
chown -R vagrant:vagrant /var/lib/westlife
chmod 700 /var/lib/westlife

# SELinux setting, allow proxy from apache to other services and security context to dir
if hash setsebool 2>/dev/null; then
  setsebool -P httpd_can_network_connect 1
  chcon -R --reference=/var/www $WP6SRC/www
  firewall-cmd --zone=public --add-port=80/tcp --permanent
  firewall-cmd --reload
fi
service httpd start
systemctl enable westlife-metadata.service
service westlife-metadata start
sleep 2
if [ -d /vagrant ]; then
   $WP6SRC/scripts/addfilesystemprovider.sh
fi
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then systemctl enable westlife-vre; fi
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then systemctl start westlife-vre; fi

# workaround for bug, reload,restart httpd fails on first attempt in SL7
service httpd reload
service httpd restart
