#!/usr/bin/env bash
cd /home/vagrant/VRE-master
source rc.sh
python manage.py migrate
honcho start
