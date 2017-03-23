#!/bin/sh.after
. /etc/cernvm/site.conf
echo Provisioning CernVM...
usermod -G wheel,docker,users,vagrant vagrant
#passwd -d vagrant
/etc/cernvm/config -x
date > /etc/vagrant_provisioned_at

echo vagrant context: setting vagrant user
# user added in cervm context
# useradd -p '$6$aSrbQftI$Q/Yk7xI0E4eNV58cRuvjqOHGXS.99BLU19QuJ5M.4X2.tTNSke2J9Cu6kf8fjegq0f1hk/MU8x/RR.TFy3nW50' vagrant
echo vagrant context: user created
echo "vagrant ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
echo "Defaults:vagrant !requiretty"   >> /etc/sudoers
echo vagrant context: user sudo set

cd /home/vagrant
if [ -f "/home/vagrant/.ssh/authorized_keys" ]
then
  echo ssh public key exists
else
  mkdir -p .ssh
  echo "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA6NF8iallvQVp22WDkTkyrtvp9eWW6A8YVr+kz4TjGYe7gHzIw+niNltGEFHzD8+v1I2YJ6oXevct1YeS0o9HZyN1Q9qgCgzUFtdOKLv6IedplqoPkcmF0aYet2PkEDo3MlTBckFXPITAMzF8dJSIFo9D8HfdOV0IAdx4O7PtixWKn5y2hMNG0zQPyUecp4pzC6kivAIhyfHilFR61RGL+GPXQ2MWZWFYbAGjyiYJnAmCP3NOTd0jMZEnDkbUvxhMmBYSdETk1rRgm+R4LOzFUGaHqHDLKLX+FIPKcF96hrucXzcWyLbIbEgE98OHlnVYCzRdK8jlqm8tehUc9c9WhQ== vagrant insecure public key" > .ssh/authorized_keys
  chmod 0600               .ssh/authorized_keys
  chmod 0700               .ssh
  chown -R vagrant:vagrant .ssh
  echo added non-secure public key 
fi
# bootstrap from cloud
#/cvmfs/west-life.egi.eu/software/virtualfolder/latest/bootstrap/bootstrapcloud.sh
# or bootstrap from sources
#/cvmfs/west-life.egi.eu/software/virtualfolder/latest/bootstrap/bootstrapsources.sh
#workaround for autologin
#killall lxdm-binary
#08/03/2017 tomas - bootstrap from cvmfs, no sources needed
#17/10/2016 tomas - bootstrap by getting sources from github, cloud version

################################
#transcript from bootstrapweb.sh
#yum -y install yum-plugin-fastestmirror
# TODO CHECK whether EPEL is needed
echo Adding EPEL repository
echo Warning: This operation might be slown down by repeating requests to SL servers.
echo minrate=10 >> /etc/yum.conf
echo timeout=120 >> /etc/yum.conf
# copy additional sl7 mirrors in UK
cp /cvmfs/west-life.egi.eu/software/virtualfolder/latest/conf/sl7*.repo /etc/yum.repos.d
echo Added mirrors to sl7 repo
yum -y install epel-release
yum repolist

#copy apache conf
cp /cvmfs/west-life.egi.eu/software/virtualfolder/latest/conf/000-default.conf /etc/httpd/conf.d/000-default.conf
yum -y install davfs2

systemctl start httpd
systemctl enable httpd

# share work directory via webdav - may be used to directly pass and process data
mkdir /home/vagrant/work
# workaround issue #6 store some config 
mkdir /home/vagrant/.westlife

#chown vagrant:vagrant /home/vagrant/work
# dir for local copy (owncloud synchronized)
#mkdir /home/vagrant/b2drop
#chown vagrant:vagrant /home/vagrant/b2drop
# dir for logs
mkdir /home/vagrant/logs
#adding vagrant and apache into davfs2 group
usermod -a -G davfs2 vagrant
usermod -a -G davfs2 apache
# set the default group of user vagrant to davfs2, to be able to mount
usermod -g davfs2 vagrant

#make link to scripts
ln -s /cvmfs/west-life.egi.eu/software/virtualfolder/latest/scripts /home/vagrant/scripts

if  grep -q MOUNTB2 /etc/sudoers; then
  echo sudoers already provisioned
else
  cat /home/vagrant/scripts/sudoers >>/etc/sudoers
  #chmod 0440 /etc/sudoers
fi

#######################
# transcript of bootstrapservice.sh

cert-sync /etc/pki/tls/certs/ca-bundle.crt
#mkdir -p /home/vagrant/logs
#chmod -R ugo+rwx /home/vagrant/logs
#generate random key
if [ -f /home/vagrant/.westlife/metadata.key ]
then
   source /home/vagrant/.westlife/metadata.key
   export VF_STORAGE_PKEY
else
   export VF_STORAGE_PKEY=`openssl rand -base64 32`
   echo VF_STORAGE_PKEY=$VF_STORAGE_PKEY > /home/vagrant/.westlife/metadata.key
fi

##########################
# transcript of bootstrapvre.sh

#configure all needed packages by VRE
yum -y install python-virtualenv 
#python-pip python-redis nodejs-supervisor python-devel libffi-devel


############################
# transcript of bootstrapscipion.sh
yum -y install openmpi openmpi-devel
# fix issue with mpic++ not found
export PATH=$PATH;/usr/lib64/openmpi/bin
sudo -E -i -u vagrant /cvmfs/west-life.egi.eu/software/scipion/latest/scipion config

mkdir -p /home/vagrant/.config/scipion/myfirstmap
mkdir -p /home/vagrant/.config/scipion/mymovies
mkdir -p /home/vagrant/.config/scipion/myresmap
mkdir -p /home/vagrant/.config/scipion/firstmap
mkdir -p /home/vagrant/.config/scipion/movies
mkdir -p /home/vagrant/.config/scipion/resmap

mkdir -p /home/vagrant/ScipionUserData/data/tests
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/myfirstmap
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/mymovies
cp /cvmfs/west-life.egi.eu/software/scipion/latest/config/hosts.conf /home/vagrant/.config/scipion/myresmap
cp $WP6SRC/Desktop/scipion* /home/vagrant/Desktop
chmod ugo+x /home/vagrant/Desktop/*

###########################
# preparing autostart
cp /cvmfs/west-life.egi.eu/software/virtualfolder/latest/conf/000-default.conf /etc/httpd/conf.d/000-default.conf
cp /cvmfs/west-life.egi.eu/software/virtualfolder/latest/conf/westlife-metadata.service /etc/systemd/system/
cp /cvmfs/west-life.egi.eu/software/virtualfolder/latest/conf/westlife-vre.service /etc/systemd/system/
chmod -R 600 /home/vagrant/.westlife
chmod u+x /home/vagrant/.westlife 
chown -R vagrant:vagrant /home/vagrant
#add permission to allow browse webdav content in /home/vagrant/work
chmod ugo+rwx /home/vagrant/work
chmod go+rx /home/vagrant

touch /home/vagrant/.westlife/vresqlite.db

systemctl reload
systemctl enable westlife-metadata
systemctl start westlife-metadata
systemctl enable westlife-vre
systemctl start westlife-vre

echo "BOOTSTRAP FINISHED, VM prepared to use"

exit

[amiconfig]
plugins=cernvm cernvm_appliance rapadminpassword

[rpath]
rap-password=

[cernvm_appliance]
password=

[cernvm]
organisations=None
repositories=west-life.egi.eu
#extra-repositories=west-life.egi.eu|west-life.egi.eu|MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxKhc7s1HmmPWH4Cq1U3K4FNFKcMQgZxUrgQEfvgkF97OZ8I8wzC9MWqmegX6tqlPmAzYWTM+Xi4nEBWYRhd+hVN/prHyYGzb/kTyCSHa9EQtIk9SUyoPfQxkGRnx68pD5con8KJySNa8neplsXx+2gypwjasBRQLzB3BrrGhrzZ5fL84+dsxNBBW6QfNO1BS5ATeWl3g1J27f0GoGtROYbPhaAd9D+B+qVo9pt3jKXvjTZQG0pE16xaX1elciFT9OhtZGaErDJyURskD7g3/NotcpBL5K5v95zA/kh5u+TRrmeTxHyDOpyrGrkqRaT5p+/C1z0HDyKFQbptegCbnGwIDAQAB
shell=/bin/bash
config_url=http://cernvm.cern.ch/config
users=vagrant:vagrant:$6$UlU6Rl9a$TOSbHFSKhiqodkkate.nIb82dtTYOphWG4CePwrEp9IHCrFxeczRgoYn8mAf6IansKHjDCw6dr7kFaUrurg41/
edition=Desktop
screenRes=1024x768
keyboard=us-acentos
startXDM=on
auto_login=on
swap_size=2G

[ucernvm-begin]
cvmfs_branch=cernvm-sl7.cern.ch
cvmfs_server=hepvm.cern.ch
[ucernvm-end]
