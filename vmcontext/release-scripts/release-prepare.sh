#!/usr/bin/env bash
echo release-prepare, will replace all occurence of latest with ${version} from conf-template to conf folder
echo release-prepare [conf-template] [conf] [version]
echo conf-template folder: $1
echo conf folder: $2
echo release version: $3
export DIRNAME=`dirname $1`
#remove remaining old dir
echo removing conf dir
rm -rf $WP6SRC/wp6-virtualfolder/$2
#copy from template dir
echo copying conf-template to conf dir
cp -R $WP6SRC/wp6-virtualfolder/$1 $WP6SRC/wp6-virtualfolder/$2
#replace in conf dir the latest by ${version}
echo replacing latest to $3
grep -rl virtualfolder\/latest ${WP6SRC}/wp6-virtualfolder/$2 | xargs sed -i s/latest/$3/g
