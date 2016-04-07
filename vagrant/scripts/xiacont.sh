#!/bin/sh
curdir=/home/vagrant/b2drop/mydata/xia
tempdir=/tmp/xia
resultdir=/home/vagrant/b2drop/mydata/xia/result
count=1
. /home/vagrant/ccp4/bin/ccp4.setup-sh
cd $curdir
inotifywait -m -q -e moved_to -e close_write --format "%f" . | while IFS= read -r file; do
  echo "new file appeared, processing $file"
  workdir=$tempdir/$file-$count-result
  mkdir -p $workdir/img
  tar -xf $file -C $workdir/img
  cd $workdir
  echo "now in $workdir"
  xia2 img
  cd $tempdir
  tar -czf $file-$count-result.tar.gz $file-$count-result
  mkdir $resultdir
  mv $file-$count-result.tar.gz $resultdir
  cd $curdir
  echo "now in $curdir"
  rm -rf $workdir
  let "count++"
done
