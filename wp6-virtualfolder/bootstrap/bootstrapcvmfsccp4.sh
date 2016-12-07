#!/usr/bin/env bash
# configure cvmfs with ccp4 and ccpem

if [ "$1" != "yes" ]; then
   echo "To enable local copy of CCP4 suite, you agree that you have Academic or Commercial License. If not, please obtain a license first at http://www.ccp4.ac.uk/ccp4license.php."
   echo -n "Agree and enable [yes/NO]:"
   read agree
   if [ $agree != "yes" ]; then
     exit 1;
   fi
fi

# workaround issue #6
umount /home/vagrant/work/b2drop
sleep 5
echo "CVMFS_REPOSITORIES=facilities.gridpp.ac.uk,west-life.egi.eu
" >/etc/cvmfs/default.local

echo "CVMFS_SERVER_URL=\"http://cvmfs-egi.gridpp.rl.ac.uk:8000/cvmfs/@org@.gridpp.ac.uk;http://cvmfs01.nikhef.nl/cvmfs/@org@.gridpp.ac.uk\"
CVMFS_PUBLIC_KEY=/etc/cvmfs/keys/gridpp.ac.uk.pub
" >/etc/cvmfs/domain.d/gridpp.ac.uk.local

echo LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFwN0M0S0R2T0lFVkplcHVBSGp4RQpFRVMxc0Rkb2h6MGhpVTZ1dlNxeFZZaktWUjRZNC8wSS9EL3pMaWpRSStNSFI3ODU5Uk4wLzZmc1ozYjNBdDNsClVidk5mcXE2RE4xelZqamQweGFnQzZTTUJoU2ZqL2lRS1FTc0c4TVhTeWlObU04WWFsVkhKU1Bxb292YTZDUEUKRWdMRWpuSEtUTkVvZ1ROaktCd2JQMkVMUExrZlZvTm94eHJYUFNveDdhbG44SmRneVp6WmxCd205OGduRmExdgpKVFZBbDBIUW5VSjZjak13TzMxd0lHVk1kdlorUDk2MnQrMmJQR2ZPQ202THk2QnVzWGNMb0lJZWV6NVNCZXJCCmFIei8vTlNUWkRiSFZOUEVxcG9vMUFRVlZPbzRYSm1xbzY0akJhM0c0RHIwelNkYTFia1pNVmhzeVV0amhmRUIKRHdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==|base64 -d >/etc/cvmfs/keys/gridpp.ac.uk.pub
service autofs restart
cvmfs_config probe

if [ -z ${WP6SRC+x} ];  then cp /home/vagrant/west-life-wp6-master/wp6-virtualfolder/Desktop/c* /home/vagrant/Desktop
  else cp $WP6SRC/Desktop/c* /home/vagrant/Desktop
fi
chmod ugo+x /home/vagrant/Desktop/*

#workaround issue #6
/home/vagrant/scripts/mountb2drop.sh
