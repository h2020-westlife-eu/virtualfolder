#!/usr/bin/env bash
# put it to cvmfs
# changed to anaconda
# cd to desired directory
#DIR=`pwd`
#VERSION=18.02
DIR=\home\vagrant
VERSION=jupyter

sudo yum install -y wget
mkdir -p $DIR
cd $DIR
if [ ! -f Miniconda3-latest-Linux-x86_64.sh ]; then
  wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh
  chmod +x Miniconda3-latest-Linux-x86_64.sh
fi
$DIR/Miniconda3-latest-Linux-x86_64.sh -b -p $DIR/$VERSION
$DIR/$VERSION/bin/conda create -y --name py3 python=3
source $DIR/$VERSION/bin/activate py3
$DIR/$VERSION/bin/conda install -y jupyter pymc3 r-irkernel r=3.3.2
$DIR/$VERSION/bin/conda install -y -c rdkit rdkit
$DIR/$VERSION/bin/conda install -y scikit-learn seaborn
sed -i -e "s/\/cvmfs\/west-life.egi.eu\/software\/jupyter\/latest.*$/\/home\/vagrant\/jupyter\//g" /etc/systemd/system/westlife-vre.service
