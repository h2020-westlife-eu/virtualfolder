#!/usr/bin/env bash
sleep 15
# fetch mono in cvmfs
cd /cvmfs/west-life.egi.eu/tools/mono/
cd
source /cvmfs/west-life.egi.eu/tools/mono/mono-dev-env >> /home/vagrant/logs/MetadataService.log 2>&1
#set variables
export VF_VRE_API_URL="http://localhost:8004/api/"
export VF_STORAGE_DIR="/home/vagrant/work"
export VF_ALLOW_FILESYSTEM="true"
#start the service in backgroung with logs in
nohup mono /home/vagrant/build/MetadataService/MetadataService.exe >> /home/vagrant/logs/MetadataService.log 2>&1 &
