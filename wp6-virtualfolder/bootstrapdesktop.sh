#!/usr/bin/env bash

#apt-get install lxde
apt-get install xfce lightdm
cp -R /vagrant/lightdm /etc/lightdm
cp -R /vagrant/.config /home/vagrant/.config
cp -R /vagrant/Desktop /home/vagrant/Desktop
fromdos /home/vagrant/Desktop/*.*
fromdos /home/vagrant/.config/*
fromdos /home/vagrant/.config/*/*
fromdos /home/vagrant/.config/*/*/*
fromdos /home/vagrant/.config/*/*/*/*
chown -R vagrant:vagrant /home/vagrant/Desktop
chown -R vagrant:vagrant /home/vagrant/.config
#ln -s -f  /home/vagrant/VRE-master/static/img/westlife-background2.jpg /etc/alternatives/desktop-background
#python webkit as desktop background, firefox as default frontend browser
apt-get -y install python-webkit wmctrl firefox
