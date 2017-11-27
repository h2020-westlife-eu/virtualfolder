#!/usr/bin/env bash
#checks and install dependencies

if [ ! -f ${X509_USER_CERT} ]; then
# try to generate cert files
    P12FILE=`ls /vagrant/*.p12`
    openssl pkcs12 -in ${P12FILE} -out ${X509_USER_CERT} -clcerts -nokeys
    openssl pkcs12 -in ${P12FILE} -out ${X509_USER_KEY} -nocerts -nodes
else
  echo Using existing cert and key.
fi

#install gsi client
if ! [ -x "$(command -v gsissh)" ]; then
  sudo yum install -y gsi-openssh-clients
fi

#install grid certificates
if ! [ -e /etc/grid-security/certificates/98ef0ee5.0 ]; then
  sudo mkdir -p /etc/grid-security/certificates
  sudo curl https://cert.ca.ngs.ac.uk/98ef0ee5.0 -o /etc/grid-security/certificates/98ef0ee5.0
  sudo curl http://cert.ca.ngs.ac.uk/signing_policy/98ef0ee5.signing_policy -o /etc/grid-security/certificates/98ef0ee5.signing_policy
  sudo curl https://cert.ca.ngs.ac.uk/7ed47087.0 -o /etc/grid-security/certificates/7ed47087.0
  sudo curl http://cert.ca.ngs.ac.uk/signing_policy/7ed47087.signing_policy -o /etc/grid-security/certificates/7ed47087.signing_policy
  sudo curl https://cert.ca.ngs.ac.uk/ffc3d59b.0 -o /etc/grid-security/certificates/ffc3d59b.0
  sudo curl http://cert.ca.ngs.ac.uk/signing_policy/ffc3d59b.signing_policy -o /etc/grid-security/certificates/ffc3d59b.signing_policy
  sudo curl https://cert.ca.ngs.ac.uk/530f7122.0 -o /etc/grid-security/certificates/530f7122.0
  sudo curl http://cert.ca.ngs.ac.uk/signing_policy/530f7122.signing_policy -o /etc/grid-security/certificates/530f7122.signing_policy
  sudo curl https://cert.ca.ngs.ac.uk/1b6f5ede.0 -o /etc/grid-security/certificates/1b6f5ede.0
  sudo curl http://cert.ca.ngs.ac.uk/signing_policy/1b6f5ede.signing_policy -o /etc/grid-security/certificates/1b6f5ede.signing_policy
  sudo curl https://cert.ca.ngs.ac.uk/877af676.0 -o /etc/grid-security/certificates/877af676.0
  sudo curl http://cert.ca.ngs.ac.uk/signing_policy/877af676.signing_policy -o /etc/grid-security/certificates/877af676.signing_policy
fi
