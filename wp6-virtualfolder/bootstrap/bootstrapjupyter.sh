#!/usr/bin/env bash
# changed to anaconda
yum install -y wget
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh
chmod +x Miniconda3-latest-Linux-x86_64.sh
sudo -u vagrant ./Miniconda3-latest-Linux-x86_64.sh -b
sudo -u vagrant /home/vagrant/miniconda3/bin/conda create -y --name py3 python=3;source /home/vagrant/miniconda3/bin/activate py3;/home/vagrant/miniconda3/bin/conda install -y jupyter pymc3 r-irkernel r=3.3.2

#yum install -y python34-pip python34-devel --nogpg
#pip3 install jupyter
#pip3 install numpy scipy matplotlib patsy pandas

