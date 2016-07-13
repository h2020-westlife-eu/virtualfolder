#!/usr/bin/env bash

cp -R /vagrant/.config /home/vagrant/.config
cp -R /vagrant/Desktop /home/vagrant/Desktop
fromdos /home/vagrant/Desktop/*.*
fromdos /home/vagrant/.config/*.*
ln -S -f /etc/alternatives/desktop-background /home/vagrant/VRE-master/static/img/westlife-background2.jpg


