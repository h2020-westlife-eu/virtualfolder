#!/usr/bin/env bash
export CURDIR=`pwd`
export WP6SRC=`dirname ${CURDIR}`
export SSO_DEPLOYMENT=1
export SP_IDENTIFICATION=http://devel.westlife.virtualfolder
export SP_ENDPOINT=http://localhost:8081/mellon
rm $WP6SRC/sp_key.pem $WP6SRC/sp_cert.pem $WP6SRC/sp-metadata.xml $WP6SRC/idp-metadata.xml /vagrant/sp_key.pem /vagrant/sp_cert.pem /vagrant/sp-metadata.xml /vagrant/idp-metadata.xml
$WP6SRC/bootstrap/bootstrapsso.sh 
cp $WP6SRC/sp_key.pem $WP6SRC/sp_cert.pem $WP6SRC/sp-metadata.xml $WP6SRC/idp-metadata.xml /vagrant/