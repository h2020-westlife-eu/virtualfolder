#!/usr/bin/env bash
export CURDIR=`pwd`
export WP6SRC=`dirname ${CURDIR}`
export SSO_DEPLOYMENT=1
export SP_IDENTIFICATION=http://local.westlife.virtualfolder
export SP_ENDPOINT=http://localhost:8080
rm sp_key.pem sp_cert.pem sp-metadata.xml idp-metadata.xml /vagrant/sp_key.pem /vagrant/sp_cert.pem /vagrant/sp-metadata.xml /vagrant/idp-metadata.xml
$WP6SRC/bootstrap/bootstrapsso.sh 