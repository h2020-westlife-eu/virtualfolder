#!/usr/bin/env bash
cp -R $WP6SRC/Desktop /home/vagrant/Desktop
dos2unix /home/vagrant/Desktop/*
chown -R vagrant:vagrant /home/vagrant/Desktop
chmod ugo +x /home/vagrant/Desktop
