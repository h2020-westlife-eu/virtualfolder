#!/usr/bin/env bash
# This script runs development version of VRE
source rc.sh
python manage.py migrate
honcho start
