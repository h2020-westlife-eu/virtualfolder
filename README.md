# Virtual folder
## Introduction
West-Life is a H2020 Virtual Research Environment project that will provide the application level services specific to uses cases in structural biology. 
Data management work package WP6 build on existing infrastructure for storing and accessing data. It provides application level service usable for structural biology use cases and follows structural biology data lifecycle (Report ...).
The WP6 is distributed as a vagrant package. Configuration files and scripts which initiates self deployment, installation and configuration of prototype virtual machine.

##Installation
Prerequisites:

 1. Vagrant - tool for automation of virtual machine deployment. Download and install vagrant from https://www.vagrantup.com/
 2. Virtualbox - VM stack. Download and install virtualbox https://www.virtualbox.org/wiki/Downloads

Download [ZIP](https://github.com/h2020-westlife-eu/wp6-vm/archive/master.zip) or clone https://github.com/h2020-westlife-eu/wp6-vm.git into some [wp6-vm directory]. Note that for installation purposes the meta-repository is used at https://github.com/h2020-westlife-eu/wp6-vm rather than this one.

(Optionally), if you are behind proxy, download and install proxyconf plugin and set environment variables

    export http_proxy=http://user:password@host:port
    export https_proxy=https://user:password@host:port
    export no_proxy=localhost
    vagrant plugin install vagrant-proxyconf
    
(Optionally), if you have used west-life VM before, update the vagrant box cache

    vagrant box update    

Open command-line (e.g. cmd, cygwin or terminal)
     
    cd [wp6-vm directory]
    vagrant up    

This will start CernVM customization and boots to Scientific Linux 7.2 and configures related West-Life WP. Depending on network speed it will take several to several tens of minutes - downloading 200 MB of data.

## Usage
The new virtual machine can be accessed by SSH (by default the 2222 port is forwarded to VM)

    vagrant ssh

or via GUI in virtualbox (username/password: vagrant/vagrant)

Or via web browser (port 8080 is by default forwarded to VM, check VagrantFile or vagrant log)

    http://localhost:8080/
    
Files of the current working directory of host are mounted into <code>/home/vagrant/work/local</code>
Repositories allowing WEBDAV interface (B2DROP) are mounted into <code>/home/vagrant/work/b2drop</code>

##Current state of prototype implementation
After self deployment and installation the virtual machine provides 3 basic services:

 1. Web application at http://localhost:8080
	 - Optional connection to b2drop repository, directory browsing
 2. WebDAV protocol to the shared data at http://localhost:8080/webdav/
 
## Cleaning
After testing you may, stop (halt) or delete/clean (destroy) all VM related files
   
    vagrant halt
    vagrant destroy

##Release Notes
- 26/10/2016 - moved VagrantFile to new repository https://github.com/h2020-westlife-eu/wp6-vm, updated base box with uCernVM2.7.4 bootloader for CernVM 4 fixes security bug 'dirty COW' and aufs bug in kernel, https://atlas.hashicorp.com/westlife-eu, tested on vagrant 1.8.6, compatible with VirtualBox 5.1, vagrant < 1.8.6 requires VirtualBox 5.0.x, doesn't require VirtualBox extension pack
- version 16.10 - tested on vagrant 1.8.1 and 1.8.4 and VirtualBox 5.0.26 (version 5.0.x compatible with vagrant, note version 5.1 not compatible with vagrant < 1.8.5), download from https://www.virtualbox.org/wiki/Download_Old_Builds_5_0 
and install VirtualBox Extension Pack 

##Further doc
http://internal-wiki.west-life.eu/w/index.php?title=D6.1
