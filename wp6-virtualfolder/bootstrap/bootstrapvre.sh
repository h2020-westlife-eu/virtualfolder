#!/usr/bin/env sh
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then echo "portal deployment";
else
  mv /etc/httpd/conf.d/vre.inc.single /etc/httpd/conf.d/vre.inc
  sed -i -e "s/\(\s*Alias\).*$/\1\"\/\" \"${WP6SRC}\/singlevre\/\"/g" /etc/httpd/conf.d/vre.inc
  sed -i -e "s/\(\s*\<Directory\).*$/\1\"\/\" \"${WP6SRC}\/singlevre\"/g" /etc/httpd/conf.d/vre.inc
fi
#install VRE sources
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then
  git clone https://github.com/h2020-westlife-eu/VRE.git
  cd VRE
  git checkout dev
  cd ..
  mv VRE $VRE-master
  cp $WP6SRC/VRE-master/rundevvre.sh /home/vagrant/VRE-master
  cp $WP6SRC/VRE-master/addvagrantuser.py /home/vagrant/VRE-master

  cp /home/vagrant/VRE-master/static/img/westlife-logo.png /home/vagrant/.icons

  #configure all needed packages by VRE
  yum -y install gcc openssl-devel python-virtualenv python-pip python-redis nodejs-supervisor python-devel libffi-devel
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
fi
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then systemctl enable westlife-vre; fi
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then systemctl start westlife-vre; fi


