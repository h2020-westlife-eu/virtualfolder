#!/usr/bin/env bash
# put it to cvmfs
# changed to anaconda
# cd to desired directory
#DIR=`pwd`
#VERSION=18.08
#ALLOW_JUPYTER=1
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
conda install -y -c rdkit -c bioconda rdkit jupyter pymc3 r-irkernel r=3.3.2 tornado=4.5.3 scikit-learn seaborn keras mkl pandas pillow pydot scipy tensorflow scikit-image line_profiler memory_profiler numexpr pandas-datareader netcdf4 pivottablejs jupyterlab python-libsbml cobra xmltodict 
conda install -y -c InsiliChem  prody
conda install -y -c conda-forge -c bioconda bioservices jupyter_contrib_nbextensions nglview octave octave_kernel ghostscript texinfo bqplot mpld3 ipython-sql
#conda install -y -c rdkit rdkit
# machine learning course
#conda install -y scikit-learn seaborn keras mkl pandas pillow pydot scipy tensorflow 
# data science handbook
#conda install -y scikit-image line_profiler memory_profiler numexpr pandas-datareader netcdf4 
# jupyter tips and tricks
#conda install -y pivottablejs jupyterlab
# octave
# conda install -q -y -c conda-forge octave octave_kernel ghostscript texinfo

##commented as it seems to take too long to install
##conda install -y -c conda-forge bqplot mpld3 ipython-sql
#jupyter-nbextension enable nglview --py --sys-prefix

# openmodelica, blas-devel and lapack-devel required for OMC, it also installs gcc,c++,c compilers
wget https://build.openmodelica.org/rpm/el7/omc.repo -O /etc/yum.repos.d/omc.repo
yum install -y openmodelica-1.13 blas-devel lapack-devel omniORB

# omniorb
#yum install -y omniORB
# zeromq
wget https://download.opensuse.org/repositories/network:/messaging:/zeromq:/release-draft/CentOS_7/network:messaging:zeromq:release-draft.repo -O /etc/yum.repos.d/zeromq.repo
yum install -y zeromq 

# ompython
pip install -U https://github.com/OpenModelica/OMPython/archive/master.zip

# jupyter prov-o support 
pip install prov

# jupyter nglview and ssbio
pip install ssbio

#sos polyglot notebook
pip install sos
pip install sos-notebook
pip install sos-r
python -m sos_notebook.install
jupyter labextension install jupyterlab-sos

# jupyter openmodelica nb
pip install -U https://github.com/OpenModelica/jupyter-openmodelica/archive/master.zip

#link to jupyter installation
ln -s $DIR/$VERSION /opt/jupyter
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

# install gcc 6 - needed for autosklearn
# alternatively conda install gxx_linux-64 gcc_linux-64 swig, but will clash with openmodelica libs

yum install -y yum-conf-repos yum-conf-softwarecollections
yum install -y devtoolset-6
scl enable devtoolset-6 bash
gcc --version

#autosklearn
#swig 3 from sources
wget http://prdownloads.sourceforge.net/swig/swig-3.0.12.tar.gz
tar -xzf swig-3.0.12.tar.gz
cd swig-3.0.12
./configure
make
make install
cd ..
#auto-sklearn
curl https://raw.githubusercontent.com/automl/auto-sklearn/master/requirements.txt | xargs -n 1 -L 1 pip install
pip install auto-sklearn

#conda -y -c conda-forge blas lapack

else
  echo Skipping Jupyter provisioning.
fi
