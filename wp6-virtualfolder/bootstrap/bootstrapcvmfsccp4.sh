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

echo "CVMFS_REPOSITORIES=facilities.gridpp.ac.uk,west-life.egi.eu
" >/etc/cvmfs/default.local

echo "CVMFS_SERVER_URL=\"http://cvmfs-egi.gridpp.rl.ac.uk:8000/cvmfs/@org@.gridpp.ac.uk;http://cvmfs01.nikhef.nl/cvmfs/@org@.gridpp.ac.uk\"
CVMFS_PUBLIC_KEY=/etc/cvmfs/keys/gridpp.ac.uk.pub
" >/etc/cvmfs/domain.d/gridpp.ac.uk.local

echo "-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp7C4KDvOIEVJepuAHjxE
EES1sDdohz0hiU6uvSqxVYjKVR4Y4/0I/D/zLijQI+MHR7859RN0/6fsZ3b3At3l
UbvNfqq6DN1zVjjd0xagC6SMBhSfj/iQKQSsG8MXSyiNmM8YalVHJSPqoova6CPE
EgLEjnHKTNEogTNjKBwbP2ELPLkfVoNoxxrXPSox7aln8JdgyZzZlBwm98gnFa1v
JTVAl0HQnUJ6cjMwO31wIGVMdvZ+P962t+2bPGfOCm6Ly6BusXcLoIIeez5SBerB
aHz//NSTZDbHVNPEqpoo1AQVVOo4XJmqo64jBa3G4Dr0zSda1bkZMVhsyUtjhfEB
DwIDAQAB
-----END PUBLIC KEY-----
">/etc/cvmfs/keys/gridpp.ac.uk.pub
service autofs restart
cvmfs_config probe

if [ -z ${WP6SRC+x} ];  then cp /home/vagrant/west-life-wp6-master/wp6-virtualfolder/Desktop/c* /home/vagrant/Desktop
  else cp $WP6SRC/Desktop/c* /home/vagrant/Desktop
fi
chmod ugo+x /home/vagrant/Desktop/*
