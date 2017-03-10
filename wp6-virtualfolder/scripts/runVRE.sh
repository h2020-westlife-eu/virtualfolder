#!/usr/bin/env bash
# This script runs development version of VRE
cd /cvmfs/west-life.egi.eu/software/vre/latest
source rc.sh
#python manage.py migrate
honcho start
