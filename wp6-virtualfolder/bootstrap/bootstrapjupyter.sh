#!/usr/bin/env bash
yum install -y python34-pip --nogpg
pip3 install jupyter
chown -R vagrant:vagrant /home/vagrant/.jupyter
chown -R vagrant:vagrant /home/vagrant/logs
