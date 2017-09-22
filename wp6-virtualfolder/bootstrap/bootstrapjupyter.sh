#!/usr/bin/env bash
yum install wget
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh
sudo -u vagrant Miniconda3-latest-Linux-x86_64.sh
sudo -u vagrant conda create --name py3 python=3 jupyter conda;source activate py3;conda install pymc3; conda install r-irkernel
# yum install -y python34-pip python34-devel --nogpg
#pip3 install jupyter
#pip3 install numpy scipy matplotlib patsy pandas

