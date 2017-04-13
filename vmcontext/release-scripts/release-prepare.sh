#!/usr/bin/env bash
echo release-prepare, will replace all occurence of latest with ${version} from conf-template to conf folder
echo release-prepare [conf-template] [conf] [version]
echo conf-template folder: $1
echo conf folder: $2
echo release version: $3
export DIRNAME=`dirname $1`
#remove remaining old dir
rm -rf /home/vagrant/west-life-wp6/wp6-virtualfolder/$2
#copy from template dir
cp -R /home/vagrant/west-life-wp6/wp6-virtualfolder/$1 /home/vagrant/west-life-wp6/wp6-virtualfolder/$2
#replace in conf dir the latest by ${version}
grep -rl virtualfolder\/latest /home/vagrant/west-life-wp6/wp6-virtualfolder/$2 | xargs sed -i s/latest/$3/g
