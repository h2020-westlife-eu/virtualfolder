#!/usr/bin/env bash
# this script downloads/compiles/installs virtuoso tool into /opt/virtuoso

yum -y install gperf
curl -o virtuoso.zip https://codeload.github.com/openlink/virtuoso-opensource/zip/master
unzip -q virtuoso.zip
CFLAGS="-O2 -m64"
export CFLAGS
export VIRTUOSOPATH='/opt/virtuoso'
cd virtuoso-opensource-master
./autogen.sh
# add sparql endpoint
# maybe also http://opldownload.s3.amazonaws.com/uda/vad-packages/7.2/isparql_dav.vad
# and http://opldownload.s3.amazonaws.com/uda/vad-packages/7.2/fct_dav.vad
# and http://opldownload.s3.amazonaws.com/uda/vad-packages/7.2/pivot_dav.vad

# for options, see ./configure --help
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
