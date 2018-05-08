#!/usr/bin/env bash
#05/08/2018 tomas - bootstrap from current directory
#17/10/2016 tomas - bootstrap by getting sources from github, cloud version

#################################################
# or use wp6 sources from vagrant shared folder #
#################################################

export WP6SRC=`pwd`/wp6-virtualfolder

###########################
# launch bootstrap script #
###########################

dos2unix $WP6SRC/bootstrap/*
chmod ugo+x $WP6SRC/bootstrap/*.sh
$WP6SRC/bootstrap/bootstrap.sh
