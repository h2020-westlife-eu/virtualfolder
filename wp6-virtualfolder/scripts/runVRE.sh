#!/usr/bin/env bash
# This script runs development version of VRE
cd /home/vagrant/VRE-master
source rc.sh
python manage.py migrate
honcho start
