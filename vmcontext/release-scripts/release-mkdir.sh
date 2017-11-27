#!/usr/bin/env bash
echo release-mkdir [version]
echo version: $1
gsissh -v -p 1975 cvmfs-upload01.gridpp.rl.ac.uk mkdir -p cvmfs_repo/software/${WP6REMOTEMODULE}/$1
gsissh -v -p 1975 cvmfs-upload01.gridpp.rl.ac.uk ln -f -s $1 cvmfs_repo/software/${WP6REMOTEMODULE}/latest
