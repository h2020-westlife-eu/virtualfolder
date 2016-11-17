#!/usr/bin/env bash
sleep 15
cd /cvmfs/west-life.egi.eu/tools/mono/
cd
source /cvmfs/west-life.egi.eu/tools/mono/mono-dev-env > /home/vagrant/logs/MetadataService.log 2>&1
nohup mono /home/vagrant/build/MetadataService/MetadataService.exe >> /home/vagrant/logs/MetadataService.log 2>&1 &
