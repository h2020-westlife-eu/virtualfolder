#!/bin/sh
#remove previous content
rm -rf /home/vagrant/b2drop
#make dir and mydata subdir for processing
mkdir -p /home/vagrant/b2drop/mydata
while :
do
  owncloudcmd `cat /home/vagrant/secrets_oc`
  sleep 10
  echo "infinite loop [hit CTRL+C to stop]"
done
