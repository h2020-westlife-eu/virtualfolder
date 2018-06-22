#!/usr/bin/env bash
# copy all system config to /
cp -R $WP6SRC/conf-template/* /
WP6SRCESC=$(echo $WP6SRC | sed 's_/_\\/_g')
sed -i -e "s/\/cvmfs\/west-life.egi.eu\/software\/virtualfolder\/latest/${WP6SRCESC}/g" /etc/httpd/conf.d/000-default.conf
sed -i -e "s/\/cvmfs\/west-life.egi.eu\/software\/virtualfolder\/latest/${WP6SRCESC}/g" /etc/httpd/conf.d/000-default.conf.sso
