#!/usr/bin/env bash
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
cp sl7*.repo /etc/yum.repos.d
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
   `cat /home/vagrant/.westlife/metadata.key`
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
