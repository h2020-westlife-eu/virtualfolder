#!/usr/bin/env bash
echo release-copy nonrecursive [wp6-folder] [version]
echo wp6-folder: $1
echo version: $2
export DIRNAME=`dirname $1`
echo gsiscp -P 1975 $WP6SRC/${WP6MODULE}/$1 cvmfs-upload01.gridpp.rl.ac.uk:cvmfs_repo/software/${WP6REMOTEMODULE}/$2/$DIRNAME
gsissh -v -p 1975 cvmfs-upload01.gridpp.rl.ac.uk mkdir -p cvmfs_repo/software/${WP6REMOTEMODULE}/$2/$1
gsiscp -P 1975 $WP6SRC/${WP6MODULE}/$1/* cvmfs-upload01.gridpp.rl.ac.uk:cvmfs_repo/software/${WP6REMOTEMODULE}/$2/$1
