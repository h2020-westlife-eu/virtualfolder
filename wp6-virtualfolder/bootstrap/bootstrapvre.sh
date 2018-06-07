#!/usr/bin/env sh
# 24.08.2017 tomas - permissive SELinux 
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then echo "portal deployment";
else
  cp ${WP6SRC}/conf-template/etc/httpd/conf.d/vre.inc.single /etc/httpd/conf.d/vre.inc
  sed -i -e "s|\Alias.*$|Alias \"\/api\" \"$WP6SRC\/singlevre\/api\/\"|g" /etc/httpd/conf.d/vre.inc
  sed -i -e "s|<Directory.*$|<Directory \"$WP6SRC\/singlevre\/api\" >|g" /etc/httpd/conf.d/vre.inc
  service httpd restart
  # 24.08.2017 tomas - permissive SELinux - prevent HTTP 403 Forbidden for api/vfsession
  sed -i -e "s|\SELINUX=.*$|SELINUX=permissive|g" /etc/selinux/config
  setenforce 0 
fi
#install VRE sources
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then
  if [ ! -d $VREDIR ]; then
    mkdir -p $VREDIR
  fi
  cd $VREDIR
  git clone https://github.com/h2020-westlife-eu/VRE.git
  cd VRE
  git checkout dev
  cd ..
  mv VRE VRE-master
  cp $WP6SRC/VRE-master/rundevvre.sh $VREDIR/VRE-master
  cp $WP6SRC/VRE-master/addvagrantuser.py $VREDIR/VRE-master

  cp $VREDIR/VRE-master/static/img/westlife-logo.png /home/vagrant/.icons

  #configure all needed packages by VRE
  yum -y install python-virtualenv
  yum -y install python-pip
  yum -y install gcc openssl-devel
  yum -y install python-redis
  yum -y install nodejs-supervisor
  yum -y install python-devel
  yum -y install libffi-devel
  yum -y install postgresql-devel
  #not needed when cloning from dev branch
  #cp -R $WP6SRC/VRE-master/* /home/vagrant/VRE-master
  # Prepares development version of VRE
  cd $VREDIR/VRE-master
  bash make_venv.sh
  cd $VREDIR/VRE-master
  mkdir /home/vagrant/.westlife
  source ./rc.sh
  python manage.py migrate
  python addvagrantuser.py
  chown -R vagrant:vagrant $VREDIR/VRE-master
  systemctl enable westlife-vre
  systemctl start westlife-vre
fi
