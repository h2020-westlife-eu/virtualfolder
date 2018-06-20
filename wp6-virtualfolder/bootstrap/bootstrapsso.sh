#!/usr/bin/env bash
if [[ -n ${SSO_DEPLOYMENT} && ${SSO_DEPLOYMENT} -eq "1" ]] 
then
  echo Provisioning West-Life SSO 
# default values of SP_IDENTIFICAION and SP_ENDPOINT, please edit them for production system
# change the following to identify your site
  SP_IDENTIFICATION=http://local.west-life.eu
  SP_ENDPOINT=http://localhost:8080/mellon
########################################################################
# SSO preparation
########################################################################
# wget  
if [ -f /vagrant/sp_key.pem ]; then
  # copy sp_keys if they exists in /vagrant location
  cp /vagrant/sp_cert.pem /vagrant/sp_key.pem /vagrant/idp-metadata.xml /vagrant/sp-metadata.xml ${WP6SRC}
  # copy conf files from /vagrant location if exists
  cp /vagrant/*.conf ${WP6SRC}/conf-template/etc/httpd/conf.d/
fi

yum -y install wget mod_auth_mellon

# generate the configuration if not exists, note that sp-metadata.xml needs to be sent to idp-metadata provider
if [ ! -f ${WP6SRC}/sp_key.pem ]; then
# installs SAML2 and integrates with Westlife AAI
  echo "Generating mellon configuration"
  wget https://raw.githubusercontent.com/UNINETT/mod_auth_mellon/master/mellon_create_metadata.sh
  chmod +x mellon_create_metadata.sh
  ./mellon_create_metadata.sh $SP_IDENTIFICATION $SP_ENDPOINT
  # move to /vagrant file - so next bootstrap, provision will be same
  mv http_*.key ${WP6SRC}/sp_key.pem
  mv http_*.cert ${WP6SRC}/sp_cert.pem
  mv http_*.xml ${WP6SRC}/sp-metadata.xml
  #get west-life idp metadata
  wget https://auth.west-life.eu/proxy/saml2/idp/metadata.php
  mv metadata.php /${WP6SRC}/idp-metadata.xml
fi
# else the configuration exists (e.g. in /vagrant), it is reused

# copy the mellon configuration to /etc/httpd/mellon
echo "Copying mellon configuration to /etc/httpd/mellon";
mkdir -p /etc/httpd/mellon
cp ${WP6SRC}/sp_key.pem ${WP6SRC}/sp_cert.pem ${WP6SRC}/sp-metadata.xml ${WP6SRC}/idp-metadata.xml /etc/httpd/mellon
chmod 600 /etc/httpd/mellon/sp_key.pem
cp -f /etc/httpd/conf.d/000-default.conf.sso /etc/httpd/conf.d/000-default.conf 
echo "Check http://localhost:8080/mellon/metadata \nIf not yet registered, send the metadata file: sp-metadata.xml to West-life AAI provider westlife-aai@ics.muni.cz." 
fi