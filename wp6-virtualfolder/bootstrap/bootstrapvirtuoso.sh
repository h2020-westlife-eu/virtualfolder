#!/usr/bin/env bash
# 12.10.2016 - moved to cvmfs, copy local db
export VIRTUOSOPATH='/cvmfs/west-life.egi.eu/software/virtuoso/latest'
export LOCALVIRTUOSOPATH='/opt/virtuoso'
mkdir -p $LOCALVIRTUOSOPATH/var/lib/virtuoso
cp -R $VIRTUOSOPATH/var/lib/virtuoso/db $LOCALVIRTUOSOPATH/var/lib/virtuoso
rm $LOCALVIRTUOSOPATH/var/lib/virtuoso/db/virtuoso.lck
#chown -R vagrant:vagrant $LOCALVIRTUOSOPATH
exit
# other rows are ignored

# this script downloads/compiles/installs virtuoso tool into /opt/virtuoso
yum -y install net-tools wget unzip autoconf automake libtool flex bison gperf gawk m4 make openssl-devel readline-devel
#yum -y install gperf

wget https://codeload.github.com/openlink/virtuoso-opensource/zip/develop/7 -nv -O virtuoso.zip
#curl -o virtuoso.zip https://codeload.github.com/openlink/virtuoso-opensource/zip/master
unzip -q virtuoso.zip
CFLAGS="-m64 -w"
export CFLAGS
export VIRTUOSOPATH='/opt/virtuoso'
export VIRTUOSOBUILD='virtuoso-opensource-develop-7'
cd $VIRTUOSOBUILD
./autogen.sh
# add sparql endpoint
# maybe also http://opldownload.s3.amazonaws.com/uda/vad-packages/7.2/isparql_dav.vad
# and http://opldownload.s3.amazonaws.com/uda/vad-packages/7.2/fct_dav.vad
# and http://opldownload.s3.amazonaws.com/uda/vad-packages/7.2/pivot_dav.vad

# for options, see ./configure --help
#    --program-transform-name="s/isql/isql-vt/" \
./configure \
    --enable-silent-rules \
    --program-transform-name="s/isql/isql-vt/" \
    --with-readline \
    --prefix=$VIRTUOSOPATH \
  --disable-bpel-vad      \
  --enable-conductor-vad  \
  --disable-dbpedia-vad   \
  --disable-demo-vad      \
  --disable-fct-vad       \
  --enable-isparql-vad    \
  --disable-ods-vad       \
  --disable-rdfmappers-vad \
  --disable-rdb2rdf-vad   \
  --disable-sparqldemo-vad \
  --disable-syncml-vad    \
  --disable-tutorial-vad

make
make install prefix=$VIRTUOSOPATH

#cd ..

#rm -rf $VIRTUOSOBUILD

#rm virtuoso.zip
