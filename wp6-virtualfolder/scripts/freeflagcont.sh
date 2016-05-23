curdir=~/b2drop/mydata/freerflag
tempdir=/tmp/tomas/freerflag
resultdir=~/b2drop/mydata/freerflag/result
count=1
. ~/ccp4/ccp4-7.0/bin/ccp4.setup-sh
cd $curdir
inotifywait -m -q -e moved_to --format "%f" . | while IFS= read -r file; do
  echo "new file appeared, processing $file"
#  workdir=$tempdir/$file-$count-result
#  mkdir -p $workdir/img
#  tar -xf $file -C $workdir/img
#  cd $workdir
#  echo "now in $workdir"
freerflag HKLIN $file HKLOUT $resultdir/$file.$count.free <<+
FREERFRAC 0.05
+

cad HKLIN1 $resultdir/$file.$count.free HKLOUT $resultdir/$file.$count.free_p1 <<+
OUTLIM SPACEGROUP P1
TITLE $file data extended to P1 cell
LABIN File 1 E1=FTOXD3 E2=SIGFTOXD3 E3=FreeR_flag
END
+

#  cd $tempdir
#  tar -czf $file-$count-result.tar.gz $file-$count-result
#  mkdir $resultdir
#  mv $file-$count-result.tar.gz $resultdir
#  cd $curdir
#  echo "now in $curdir"
#  rm -rf $workdir
  let "count++"
done
