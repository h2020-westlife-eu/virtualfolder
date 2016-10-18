#!/bin/sh.after
. /etc/cernvm/site.conf
echo Provisioning CernVM...
usermod -G wheel,docker,users,vagrant vagrant
#passwd -d vagrant
date > /etc/vagrant_provisioned_at

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
#workaround for autologin
killall lxdm-binary
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
proxy=http://wwwcache.dl.ac.uk:8080

[ucernvm-begin]
cvmfs_branch=cernvm-sl7.cern.ch
cvmfs_server=hepvm.cern.ch
cvmfs_proxy=http://wwwcache.dl.ac.uk:8080
cvmfs_http_proxy=http://wwwcache.dl.ac.uk:8080
[ucernvm-end]
