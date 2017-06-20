#!/usr/bin/env bash
echo release-copy nonrecursive [wp6-folder] [version]
echo wp6-folder: $1
echo version: $2
export DIRNAME=`dirname $1`
echo gsiscp -P 1975 $WP6SRC/wp6-virtualfolder/$1 cvmfs-upload01.gridpp.rl.ac.uk:cvmfs_repo/software/virtualfolder/$2/$DIRNAME
gsiscp -P 1975 $WP6SRC/wp6-virtualfolder/$1/* cvmfs-upload01.gridpp.rl.ac.uk:cvmfs_repo/software/virtualfolder/$2/$1
