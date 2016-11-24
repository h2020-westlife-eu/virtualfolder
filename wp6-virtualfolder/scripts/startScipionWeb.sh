#!/usr/bin/env bash
# copy hosts.conf to .config
mkdir -p /home/vagrant/.config/scipion/myfirstmap
mkdir -p /home/vagrant/.config/scipion/mymovies
mkdir -p /home/vagrant/.config/scipion/myresmap
cp /cvmfs/west-life.egi.eu/software/scipion/latestweb/config/hosts.conf /home/vagrant/.config/scipion/myfirstmap
cp /cvmfs/west-life.egi.eu/software/scipion/latestweb/config/hosts.conf /home/vagrant/.config/scipion/mymovies
cp /cvmfs/west-life.egi.eu/software/scipion/latestweb/config/hosts.conf /home/vagrant/.config/scipion/myresmap

/cvmfs/west-life.egi.eu/software/scipion/latestweb/scipion config
nohup /cvmfs/west-life.egi.eu/software/scipion/latestweb/scipion webserver >> /home/vagrant/logs/ScipionWeb.log 2>&1 &
