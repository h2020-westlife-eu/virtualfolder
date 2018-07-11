#!/usr/bin/env bash
# copy all system config to /
cp -R $WP6SRC/conf-template/* /
WP6SRCESC=$(echo $WP6SRC | sed 's_/_\\/_g')
# all configuration points to /opt/virtualfolder, either it is linked to cvmfs or filled by compilation
#sed -i -e "s/\/cvmfs\/west-life.egi.eu\/software\/virtualfolder\/latest\/MetadataService/\/opt\/virtualfolder\/MetadataService/g" /etc/httpd/conf.d/000-default.conf
#sed -i -e "s/\/cvmfs\/west-life.egi.eu\/software\/virtualfolder\/latest/${WP6SRCESC}/g" /etc/httpd/conf.d/000-default.conf
#sed -i -e "s/\/cvmfs\/west-life.egi.eu\/software\/virtualfolder\/latest/${WP6SRCESC}/g" /etc/httpd/conf.d/000-default.conf.sso
