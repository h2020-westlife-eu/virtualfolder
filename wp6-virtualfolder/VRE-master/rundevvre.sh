#!/usr/bin/env bash
# This script runs development version of VRE
source rc.sh
manage.py migrate
honcho start
