#!/usr/bin/env bash
# This script runs development version of VRE
cd /opt/vre
source rc.sh
#python manage.py migrate
honcho start
