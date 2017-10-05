#!/usr/bin/env bash
echo release-mkdir [version]
echo version: $1
gsissh -p 1975 cvmfs-upload01.gridpp.rl.ac.uk mkdir -p cvmfs_repo/software/virtualfolder/$1
gsissh -p 1975 cvmfs-upload01.gridpp.rl.ac.uk ln -f -s $1 cvmfs_repo/software/virtualfolder/latest
