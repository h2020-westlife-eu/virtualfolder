# Virtual folder
## Introduction
West-Life is a H2020 Virtual Research Environment project that will provide the application level services specific to uses cases in structural biology. 
Data management work package WP6 build on existing infrastructure for storing and accessing data. It provides application level service usable for structural biology use cases and follows structural biology data lifecycle (Report ...).
The WP6 is distributed as a vagrant package. Configuration files and scripts which initiates self deployment, installation and configuration of prototype virtual machine.

## Installation

Follow instruction at the meta repository from https://github.com/h2020-westlife-eu/wp6-vm.git.
 
## Usage

After installation, the new virtual machine can be accessed via web browser (port 8080 is by default forwarded to VM, check VagrantFile or vagrant log for exact port number)

    http://localhost:8080/
    
Files of the current working directory of host are mounted into <code>/home/vagrant/work/local</code>
Repositories allowing WEBDAV interface (B2DROP) are mounted into <code>/home/vagrant/work/b2drop</code>
Other configured repositories creates a directory in <code>/home/vagrant/work/</code>

## Release Notes

  * 25/11/2016 - Updated vagrant boxes to use uCernVM 2.7.7 bootloader, updated OVA images in https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm/vaversion/latest and vagrant boxes, do "vagrant box update", bug fixes, consolidated initial web page and design, fixed/added background services
  * 26/10/2016 - moved VagrantFile to new repository https://github.com/h2020-westlife-eu/wp6-vm, updated base box with uCernVM2.7.4 bootloader for CernVM 4 fixes security bug 'dirty COW' and aufs bug in kernel, https://atlas.hashicorp.com/westlife-eu, 
   * tested on Windows 7 64 bit, vagrant 1.8.6 + VirtualBox 5.1.6, vagrant 1.8.1, 1.8.4, VirtualBox 5.0.26, note vagrant < 1.8.6 requires VirtualBox 5.0.x, doesn't require VirtualBox extension pack, download from https://www.virtualbox.org/wiki/Download_Old_Builds_5_0 
   * tested on Ubuntu 14.04 LTS, (default vagrant 1.4.3 needs to be updated to 1.8.6), default VirtualBox 4.3.36 works

## Further doc
http://internal-wiki.west-life.eu/w/index.php?title=D6.1
