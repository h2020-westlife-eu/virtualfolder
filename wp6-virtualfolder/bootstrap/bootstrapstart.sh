#!/usr/bin/env bash
export WP6SRCESC=$(echo $WP6SRC | sed 's_/_\\/_g')
export VREESC= $(echo $VREDIR | sed 's_/_\\/_g')
sed -i -e "s/\ExecStart.*$/ExecStart=${VREESC}\/VRE-master\/rundevvre.sh/g" /etc/systemd/system/westlife-vre.service
sed -i -e "s/^\(WorkingDirectory\s*=\s*\).*$/\1${VREESC}\/VRE-master/g" /etc/systemd/system/westlife-vre.service
sed -i -e "s/\ExecStart.*$/ExecStart=\/bin\/mono \/opt\/virtualfolder\/MetadataService\/MetadataService.exe/g" /etc/systemd/system/westlife-metadata.service
if [[ -n ${ALLOW_JUPYTER} && ${ALLOW_JUPYTER} -eq "1" ]] 
then 
  sed -i -e "s/\Environment=VF_ALLOW_LAB=.*$/Environment=VF_ALLOW_LAB=true/g" /etc/systemd/system/westlife-metadata.service  
  sed -i -e "s/\Environment=VF_ALLOW_NOTEBOOK=.*$/Environment=VF_ALLOW_NOTEBOOK=true/g" /etc/systemd/system/westlife-metadata.service  
else
  sed -i -e "s/\Environment=VF_ALLOW_LAB=.*$/Environment=VF_ALLOW_LAB=false/g" /etc/systemd/system/westlife-metadata.service  
  sed -i -e "s/\Environment=VF_ALLOW_NOTEBOOK=.*$/Environment=VF_ALLOW_NOTEBOOK=false/g" /etc/systemd/system/westlife-metadata.service  
fi

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
  #chcon -R --reference=/var/www $WP6SRC/www
  #chcon -R --reference=/var/www /srv/virtualfolder
  setenforce 0 # setenforce 1 and chcon -R /srv/virtualfolder seems not be enough to allow access to webdav files
  firewall-cmd --zone=public --add-port=80/tcp --permanent
  firewall-cmd --reload
fi
service httpd start
systemctl enable westlife-metadata.service
service westlife-metadata start
sleep 2
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then 
  systemctl enable westlife-vre.service 
  systemctl start westlife-vre
elif [[ -n ${SSO_DEPLOYMENT} && ${SSO_DEPLOYMENT} -eq "1" ]]; then
  echo SSO deployment
elif [ -d /vagrant ]; then 
   $WP6SRC/scripts/addfilesystemprovider.sh
fi


# workaround for bug, reload,restart httpd fails on first attempt in SL7
service httpd reload
service httpd restart
