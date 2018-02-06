#!/usr/bin/env bash
# put it to cvmfs
# changed to anaconda

yum install -y wget
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh
chmod +x Miniconda3-latest-Linux-x86_64.sh
sudo -u vagrant ./Miniconda3-latest-Linux-x86_64.sh -b
sudo -u vagrant /home/vagrant/miniconda3/bin/conda create -y --name py3 python=3
chmod ugo+x $WP6SRC/bootstrap/installjupyter.sh
sudo -u vagrant $WP6SRC/bootstrap/installjupyter.sh


