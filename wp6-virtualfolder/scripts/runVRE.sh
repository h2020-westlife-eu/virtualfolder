#!/usr/bin/env bash
# This script runs development version of VRE
cd /home/vagrant/VRE-master
bash make_venv.sh
source rc.sh
python manage.py migrate
honcho start
