#!/usr/bin/env bash
echo release-copy [wp6-folder] [version] [ext-folder]
echo wp6-folder: $1
echo version: $2
echo ext folder: $3
export DIRNAME=`dirname $1`
echo gsiscp -r -P 1975 $WP6SRC/${WP6MODULE}/$1 cvmfs-upload01.gridpp.rl.ac.uk:cvmfs_repo/software/${WP6REMOTEMODULE}/$2/$3/
gsiscp -r -P 1975 $WP6SRC/${WP6MODULE}/$1 cvmfs-upload01.gridpp.rl.ac.uk:cvmfs_repo/software/${WP6REMOTEMODULE}/$2/$3/
