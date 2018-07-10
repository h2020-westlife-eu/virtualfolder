#!/usr/bin/env bash
# put it to cvmfs
# changed to anaconda
# cd to desired directory
#DIR=`pwd`
#VERSION=18.02
if [[ -n ${ALLOW_JUPYTER} && ${ALLOW_JUPYTER} -eq "1" ]] 
then 
  echo Provisioning Jupyter notebook and dependencies
  if [[ -n "$DIR" ]]
  then
    echo DIR is set to $DIR
  else 
    DIR=$WP6SRC
    echo setting DIR to $DIR
  fi
  if [[ -n "$VERSION" ]]
  then
    echo VERSION is set to $VERSION
  else 
    VERSION=jupyter
    echo setting VERSION to $VERSION
  fi

#sudo in case this script is executed after installation
sudo yum install -y wget bzip2

mkdir -p $DIR
cd $DIR
if [ ! -f Miniconda3-latest-Linux-x86_64.sh ]; then
  wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh
  chmod +x Miniconda3-latest-Linux-x86_64.sh
fi
$DIR/Miniconda3-latest-Linux-x86_64.sh -b -p $DIR/$VERSION
$DIR/$VERSION/bin/conda create -y --name py3 python=3
source $DIR/$VERSION/bin/activate py3
conda install -y jupyter pymc3 r-irkernel r=3.3.2 tornado=4.5.3 
conda install -y -c rdkit rdkit
# machine learning course
conda install -y scikit-learn seaborn keras mkl pandas pillow pydot scipy tensorflow 
# data science handbook
conda install -y scikit-image line_profiler memory_profiler numexpr pandas-datareader netcdf4 
# jupyter tips and tricks
conda install -y pivottablejs jupyterlab
conda install -y -c conda-forge bqplot mpld3 ipython-sql
# jupyter nglview and ssbio
pip install nglview ssbio
jupyter-nbextension enable nglview --py --sys-prefix

ln -s /opt/jupyter $DIR/$VERSION
#DIR_ESC=$(echo $DIR/$VERSION | sed 's_/_\\/_g')
#sed -i -e "s/\/cvmfs\/west-life.egi.eu\/software\/jupyter\/latest/$DIR_ESC/g" $WP6SRC/scripts/startJupyter.sh
#sed -i -e "s/\/cvmfs\/west-life.egi.eu\/software\/jupyter\/latest/$DIR_ESC/g" $WP6SRC/scripts/startJupyterlab.sh

#install dependencies of ssbio
#dssp
yum install -y dssp
ln -s /usr/bin/mkdssp /usr/bin/dssp
#yum install msms
#ln -s /usr/local/lib/msms/msms.x86_64Linux2.2.6.1 /usr/local/bin/msms
#ln -s /usr/local/lib/msms/pdb_to_xyzr* /usr/local/bin/
#stride
#mkdir -p /usr/local/lib/stride
#freesasa
#
else
  echo Skipping Jupyter provisioning.
fi
