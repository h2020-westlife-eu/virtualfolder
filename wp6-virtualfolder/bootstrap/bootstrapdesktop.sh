#!/usr/bin/env bash

#apt-get install lxde
apt-get update
apt-get -y install lightdm xfce4

#remove unused packages installed from metapackage
apt-get -y remove xscreensaver

cp -R /vagrant/lightdm/* /etc/lightdm/
cp -R /vagrant/.config /home/vagrant/.config
cp -R /vagrant/.local /home/vagrant/.local
# remove desktop icons
#cp -R /vagrant/Desktop /home/vagrant/Desktop
#fromdos /home/vagrant/Desktop/*.*
fromdos /home/vagrant/.config/*
fromdos /home/vagrant/.config/*/*
fromdos /home/vagrant/.config/*/*/*
fromdos /home/vagrant/.config/*/*/*/*
fromdos /home/vagrant/.local/*/*/*

chown -R vagrant:vagrant /home/vagrant/Desktop
chown -R vagrant:vagrant /home/vagrant/.config
chown -R vagrant:vagrant /home/vagrant/.local
chown -R vagrant:vagrant /home/vagrant/scripts

#ln -s -f  /home/vagrant/VRE-master/static/img/westlife-background2.jpg /etc/alternatives/desktop-background
#python webkit as desktop background, firefox as default frontend browser
apt-get -y install python-webkit wmctrl firefox

# service lightdm restart
# moved to bootstrap start
