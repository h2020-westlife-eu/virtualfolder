#!/usr/bin/env bash
cd /home/vagrant/VRE-master
bash make_venv.sh
source rc.sh
python manage.py migrate
honcho start
