

To use this:

1) Install a VM host, e.g. VirtualBox
2) Install Vagrant: https://www.vagrantup.com/docs/installation/

3) If you are behind an HTTP proxy:

export http_proxy=http://user:password@host:port
export https_proxy=https://user:password@host:port
vagrant plugin install vagrant-proxyconf

Add to vagrant/vagrantfile:

config.proxy.http     = "http://yourproxy:8080"
config.proxy.https    = "http://yourproxy:8080"
config.proxy.no_proxy = "localhost,127.0.0.1"

4) cd vagrant; vagrant up. This will take some while
5) Visit http://localhost:8080/doku/doku.php 
