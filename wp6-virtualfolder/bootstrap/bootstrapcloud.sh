#!/usr/bin/env bash
#transcript from bootstrap scripts - set PORTAL_DEPLOYMENT=1 to enable VRE, otherwise single user deployment is available
cp -R /cvmfs/west-life.egi.eu/software/virtualfolder/latest/conf/* /
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then echo "portal deployment"; else mv /etc/httpd/conf.d/vre.inc.single /etc/httpd/conf.d/vre.inc; fi
echo Added mirrors to sl7 repo, httpd config, westlife services
yum -y install epel-release
yum repolist
yum -y install davfs2
systemctl start httpd
systemctl enable httpd
mkdir /home/vagrant/work /home/vagrant/.westlife /home/vagrant/logs
usermod -a -G davfs2 vagrant
usermod -a -G davfs2 apache
usermod -g davfs2 vagrant
#make link to scripts
ln -s /cvmfs/west-life.egi.eu/software/virtualfolder/latest/scripts /home/vagrant/scripts
if  grep -q MOUNTB2 /etc/sudoers; then
  echo sudoers already provisioned
else
  cat /home/vagrant/scripts/sudoers >>/etc/sudoers
fi
# transcript of bootstrapservice.sh
cert-sync /etc/pki/tls/certs/ca-bundle.crt
if [ -f /home/vagrant/.westlife/metadata.key ]
then
   source /home/vagrant/.westlife/metadata.key
   export VF_STORAGE_PKEY
else
   export VF_STORAGE_PKEY=`openssl rand -base64 32`
   echo VF_STORAGE_PKEY=$VF_STORAGE_PKEY > /home/vagrant/.westlife/metadata.key
fi
# transcript of bootstrapvre.sh, single deployment comment # transcript of bootstrapscipion.sh
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then yum -y install python-virtualenv; fi
yum -y install openmpi openmpi-devel
export PATH=$PATH;/usr/lib64/openmpi/bin
sudo -E -i -u vagrant /cvmfs/west-life.egi.eu/software/scipion/latest/scipion config
mkdir -p /home/vagrant/.config/scipion/myfirstmap /home/vagrant/.config/scipion/mymovies /home/vagrant/.config/scipion/myresmap /home/vagrant/.config/scipion/firstmap /home/vagrant/.config/scipion/movies /home/vagrant/.config/scipion/resmap
mkdir -p /home/vagrant/ScipionUserData/data/tests
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/myfirstmap
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/mymovies
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/myresmap
cp /cvmfs/west-life.egi.eu/software/virtualfolder/latest/conf/Desktop/scipion* /home/vagrant/Desktop
chmod ugo+x /home/vagrant/Desktop/*
# preparing autostart
chmod -R 600 /home/vagrant/.westlife
chmod u+x /home/vagrant/.westlife 
#add permission to allow browse webdav content in /home/vagrant/work
chmod ugo+rwx /home/vagrant/work
chmod go+rx /home/vagrant
touch /home/vagrant/.westlife/vresqlite.db
chown -R vagrant:vagrant /home/vagrant
systemctl reload
systemctl enable westlife-metadata
systemctl start westlife-metadata
#single deployment comment, VRE deployment, uncomment
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then systemctl enable westlife-vre; fi
if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then systemctl start westlife-vre; fi
echo "BOOTSTRAP FINISHED, VM prepared to use"