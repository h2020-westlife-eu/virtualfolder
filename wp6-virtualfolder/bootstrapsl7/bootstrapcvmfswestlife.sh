#!/usr/bin/env bash
# configure cvmfs with ccp4 and ccpem

echo "CVMFS_REPOSITORIES=west-life.egi.eu
CVMFS_DEBUGLOG=/tmp/cvmfs.log
" >/etc/cvmfs/default.local

service autofs restart
cvmfs_config probe
