#!/usr/bin/env bash
# this script downloads/compiles/installs virtuoso tool into /opt/virtuoso

yum -y install gperf
wget https://codeload.github.com/openlink/virtuoso-opensource/zip/develop/7 -O virtuoso.zip
#curl -o virtuoso.zip https://codeload.github.com/openlink/virtuoso-opensource/zip/master
unzip -q virtuoso.zip
CFLAGS="-m64"
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
cd ..
rm -rf $VIRTUOSOBUILD
rm virtuoso.zip