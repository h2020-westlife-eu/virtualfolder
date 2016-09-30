#!/bin/sh.after
. /etc/cernvm/site.conf
echo vagrant context: setting vagrant user
# user added in cervm context
# useradd -p '$6$aSrbQftI$Q/Yk7xI0E4eNV58cRuvjqOHGXS.99BLU19QuJ5M.4X2.tTNSke2J9Cu6kf8fjegq0f1hk/MU8x/RR.TFy3nW50' vagrant
echo vagrant context: user created
echo "vagrant ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
echo "Defaults:vagrant !requiretty"   >> /etc/sudoers
echo vagrant context: user sudo set

cd /home/vagrant
mkdir -p .ssh
echo "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA6NF8iallvQVp22WDkTkyrtvp9eWW6A8YVr+kz4TjGYe7gHzIw+niNltGEFHzD8+v1I2YJ6oXevct1YeS0o9HZyN1Q9qgCgzUFtdOKLv6IedplqoPkcmF0aYet2PkEDo3MlTBckFXPITAMzF8dJSIFo9D8HfdOV0IAdx4O7PtixWKn5y2hMNG0zQPyUecp4pzC6kivAIhyfHilFR61RGL+GPXQ2MWZWFYbAGjyiYJnAmCP3NOTd0jMZEnDkbUvxhMmBYSdETk1rRgm+R4LOzFUGaHqHDLKLX+FIPKcF96hrucXzcWyLbIbEgE98OHlnVYCzRdK8jlqm8tehUc9c9WhQ== vagrant insecure public key" > .ssh/authorized_keys
chmod 0600               .ssh/authorized_keys
chmod 0700               .ssh
chown -R vagrant:vagrant .ssh
echo vagrant context: ssh public key created
exit
[amiconfig]
plugins=cernvm cernvm_appliance rapadminpassword

[rpath]
rap-password=

[cernvm_appliance]
password=

[cernvm]
organisations=None
repositories=
shell=/bin/bash
config_url=http://cernvm.cern.ch/config
users=vagrant:vagrant:$6$UlU6Rl9a$TOSbHFSKhiqodkkate.nIb82dtTYOphWG4CePwrEp9IHCrFxeczRgoYn8mAf6IansKHjDCw6dr7kFaUrurg41/
edition=Desktop
screenRes=1024x768
keyboard=us-acentos
startXDM=on

[ucernvm-begin]
cvmfs_branch=cernvm-prod.cern.ch
cvmfs_http_proxy=http://wwwcache.dl.ac.uk:8080
cvmfs_proxy=http://wwwcache.dl.ac.uk:8080
[ucernvm-end]
