#!/usr/bin/env sh
# 24.08.2017 tomas - permissive SELinux 
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then echo "portal deployment";
else
  cp ${WP6SRC}/conf-template/etc/httpd/conf.d/vre.inc.single /etc/httpd/conf.d/vre.inc
  sed -i -e "s|\Alias.*$|Alias \"\/\" \"$WP6SRC\/singlevre\/\"|g" /etc/httpd/conf.d/vre.inc
  sed -i -e "s|<Directory.*$|<Directory \"$WP6SRC\/singlevre\" >|g" /etc/httpd/conf.d/vre.inc
  service httpd restart
  # 24.08.2017 tomas - permissive SELinux - prevent HTTP 403 Forbidden for api/vfsession
  sed -i -e "s|\SELINUX=.*$|SELINUX=permissive|g" /etc/selinux/config
  setenforce 0 
fi
#install VRE sources
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then
  cd /home/vagrant
  git clone https://github.com/h2020-westlife-eu/VRE.git
  cd VRE
  git checkout dev
  cd ..
  mv VRE VRE-master
  cp $WP6SRC/VRE-master/rundevvre.sh /home/vagrant/VRE-master
  cp $WP6SRC/VRE-master/addvagrantuser.py /home/vagrant/VRE-master

  cp /home/vagrant/VRE-master/static/img/westlife-logo.png /home/vagrant/.icons

  #configure all needed packages by VRE
  yum -y install python-virtualenv
  yum -y install python-pip 
  yum -y install gcc openssl-devel 
  yum -y install python-redis 
  yum -y install nodejs-supervisor 
  yum -y install python-devel 
  yum -y install libffi-devel
  #not needed when cloning from dev branch
  #cp -R $WP6SRC/VRE-master/* /home/vagrant/VRE-master
  # Prepares development version of VRE
  cd /home/vagrant/VRE-master
  bash make_venv.sh
  cd /home/vagrant/VRE-master
  source ./rc.sh
  python manage.py migrate
  python addvagrantuser.py
  chown -R vagrant:vagrant /home/vagrant/VRE-master
  systemctl enable westlife-vre
  systemctl start westlife-vre
fi


