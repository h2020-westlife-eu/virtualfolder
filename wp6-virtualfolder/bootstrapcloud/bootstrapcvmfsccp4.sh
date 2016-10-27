#!/usr/bin/env bash
# configure cvmfs with ccp4 and ccpem

echo "CVMFS_REPOSITORIES=facilities.gridpp.ac.uk,west-life.egi.eu
CVMFS_DEBUGLOG=/tmp/cvmfs.log
CVMFS_HTTP_PROXY=\"http://cvmfs-squid.gridpp.rl.ac.uk:3128\"
" >/etc/cvmfs/default.local

echo "CVMFS_SERVER_URL=\"http://cvmfs-egi.gridpp.rl.ac.uk:8000/cvmfs/@org@.gridpp.ac.uk;http://cvmfs01.nikhef.nl/cvmfs/@org@.gridpp.ac.uk\"
CVMFS_PUBLIC_KEY=/etc/cvmfs/keys/gridpp.ac.uk.pub
" >/etc/cvmfs/domain.d/gridpp.ac.uk.conf

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

cp $WP6SRC/Desktop/ccp* ~/Desktop
chmod ugo+x ~/Desktop/*