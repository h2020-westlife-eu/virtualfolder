# Virtual folder
## Introduction
West-Life is a H2020 Virtual Research Environment project that will provide the application level services specific to uses cases in structural biology. 
Data management work package WP6 build on existing infrastructure for storing and accessing data. It provides application level service usable for structural biology use cases and follows structural biology data lifecycle (Report ...).
The WP6 is distributed as a vagrant package. Configuration files and scripts which initiates self deployment, installation and configuration of prototype virtual machine.

## Installation
Prerequisites:

 1. Vagrant - tool for automation of virtual machine deployment. Download and install vagrant from https://www.vagrantup.com/
 2. Virtualbox - VM stack. Download and install virtualbox https://www.virtualbox.org/wiki/Downloads

Choose one of the following
 - (prefered) download metarepository [ZIP (4kB)](https://github.com/h2020-westlife-eu/wp6-vm/archive/master.zip) and unzip it into some [wp6-vm directory] or clone the meta repository from https://github.com/h2020-westlife-eu/wp6-vm.git.
 - or download (3MB) or clone (21MB) this repository - use "Clone or download" button above. This option is intended for development purposes.

(Optionally), if you are behind proxy, download and install proxyconf plugin and set environment variables

    export http_proxy=http://user:password@host:port
    export https_proxy=https://user:password@host:port
    export no_proxy=localhost
    vagrant plugin install vagrant-proxyconf
    
(Optionally), if you have used west-life VM before, update the vagrant box cache

    vagrant box update    

Open command-line (e.g. cmd, cygwin or terminal) and cd to directory where wp6-vm is unzipped/cloned
     
    cd [wp6-vm directory]
    vagrant up    

This will start VM template CernVM, boots to Scientific Linux 7.2 and performs some bootstrap scripts. Depending on network speed it will take several to several tens of minutes - downloading 200 MB of data.

## Usage
After (vagrant up) finished. The new virtual machine can be accessed by SSH (by default the 2222 port is forwarded to VM)

    vagrant ssh

or via GUI in virtualbox (username/password: vagrant/vagrant)

Or via web browser (port 8080 is by default forwarded to VM, check VagrantFile or vagrant log for exact port number)

    http://localhost:8080/
    
Files of the current working directory of host are mounted into <code>/home/vagrant/work/local</code>
Repositories allowing WEBDAV interface (B2DROP) are mounted into <code>/home/vagrant/work/b2drop</code>
Other configured repositories creates a directory in <code>/home/vagrant/work/</code>

## Uninstallation - Cleaning
After testing you may, stop (halt) the VM:
   
    vagrant halt
    
If you'll not use the VM anymore, you can delete (destroy) the VM:
    
    vagrant destroy
    
##Release Notes

  * 25/11/2016 - Updated vagrant boxes to use uCernVM 2.7.7 bootloader, updated OVA images in https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm/vaversion/latest and vagrant boxes, do "vagrant box update", bug fixes, consolidated initial web page and design, fixed/added background services
  * 26/10/2016 - moved VagrantFile to new repository https://github.com/h2020-westlife-eu/wp6-vm, updated base box with uCernVM2.7.4 bootloader for CernVM 4 fixes security bug 'dirty COW' and aufs bug in kernel, https://atlas.hashicorp.com/westlife-eu, 
   * tested on Windows 7 64 bit, vagrant 1.8.6 + VirtualBox 5.1.6, vagrant 1.8.1, 1.8.4, VirtualBox 5.0.26, note vagrant < 1.8.6 requires VirtualBox 5.0.x, doesn't require VirtualBox extension pack, download from https://www.virtualbox.org/wiki/Download_Old_Builds_5_0 
   * tested on Ubuntu 14.04 LTS, (default vagrant 1.4.3 needs to be updated to 1.8.6), default VirtualBox 4.3.36 works

##Further doc
http://internal-wiki.west-life.eu/w/index.php?title=D6.1
