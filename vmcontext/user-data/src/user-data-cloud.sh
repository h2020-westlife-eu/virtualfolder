#!/bin/sh.after
. /etc/cernvm/site.conf
echo Provisioning CernVM...
usermod -G wheel,docker,users,vagrant vagrant
/etc/cernvm/config -x
date > /etc/vagrant_provisioned_at
echo "vagrant ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
echo "Defaults:vagrant !requiretty"   >> /etc/sudoers
if [ -f "/root/.ssh/authorized_keys" ];then
  mkdir -p /home/vagrant/.ssh
  cp /root/.ssh/authorized_keys /home/vagrant/.ssh/authorized_keys
end
cd /home/vagrant
if [ -f "/home/vagrant/.ssh/authorized_keys" ]
then
  echo ssh public key exists, removing default pass
  passwd -d vagrant
else
  mkdir -p .ssh
  echo "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA6NF8iallvQVp22WDkTkyrtvp9eWW6A8YVr+kz4TjGYe7gHzIw+niNltGEFHzD8+v1I2YJ6oXevct1YeS0o9HZyN1Q9qgCgzUFtdOKLv6IedplqoPkcmF0aYet2PkEDo3MlTBckFXPITAMzF8dJSIFo9D8HfdOV0IAdx4O7PtixWKn5y2hMNG0zQPyUecp4pzC6kivAIhyfHilFR61RGL+GPXQ2MWZWFYbAGjyiYJnAmCP3NOTd0jMZEnDkbUvxhMmBYSdETk1rRgm+R4LOzFUGaHqHDLKLX+FIPKcF96hrucXzcWyLbIbEgE98OHlnVYCzRdK8jlqm8tehUc9c9WhQ== vagrant insecure public key" > .ssh/authorized_keys
  chmod 0600               .ssh/authorized_keys
  chmod 0700               .ssh
  chown -R vagrant:vagrant .ssh
  echo added non-secure public key
fi
# for single user VRE unset or set 0, for standard VRE set 1
export PORTAL_DEPLOYMENT=0
# bootstrap from cvmfs
/cvmfs/west-life.egi.eu/software/virtualfolder/latest/bootstrap/bootstrapcloud.sh
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
