# Development installation

Prerequisites:

 1. Vagrant - tool for automation of virtual machine deployment. 
  1. For MS Windows - Download and install vagrant from https://www.vagrantup.com/  (tested on/recommended version vagrant 1.9.6) 
  2. For Linux - use prefered package management
     1. Ubuntu:```apt install vagrant``` (tested on Ubuntu 17.04, vagrant 1.9.1)
     2. Centos(RHEL):```yum install vagrant```
 2. Virtualbox - VM stack. 
   1. For MS Windows - Download and install virtualbox https://www.virtualbox.org/wiki/Downloads
 (tested on/recommended version Virtualbox 5.1.30)
   2. For Linux - use preferred package management. 
      1. Ubuntu: ```apt install virtualbox``` (tested on Ubuntu 17.04, Virtualbox 5.1.22)
      2. Centos(RHEL): ```yum install virtualbox```

## Brief instruction using Vagrant

The Vagrant tool configures and bootstraps virtual machine in Virtualbox.
Brief instructions are:

```
git clone https://github.com/h2020-westlife-eu/wp6-vm.git

cd wp6-vm

vagrant up
```

![](/doc/assets/VMVagrantUp.gif)

This will start VM template, boots to CernVM or Scientific Linux 7 and performs some bootstrap scripts. Depending on network speed it will take several to several tens of minutes - CernVM image (18MB) will need to download additional 200 MB, SL7 image (700 MB) will need to download additional 100 MB. Wait until "BOOTSTRAP FINISHED", otherwise the process failed, investigate the logs.

After succesfull installation, there should be message 'BOOSTRAP FINISHED, VM prepared to use'.

The new virtual machine can be accessed via web browser  at \(port 8080 by default, check Vagrantfile for exact port number\):


http://localhost:8080/

You can access the desktop of the VM by going into VirtualBox.


The following configuration is available:
### Standalone VF from Source Codes (default)
This VM is based on CernVM 4.0 micro image which boots into Scientific Linux 7. Initial VM image size = 18MB, during boot and bootstrap downloads 658 MB. This is preferred option as CernVM distributes most updated SL7 with recent security updates, so either restart or ```cernvm-update -a``` is required occasionally.
```
git clone https://github.com/h2020-westlife-eu/wp6-vm.git
cd wp6-vm/vf-standalone-src/
vagrant up
```

### Standalone VF from Binaries (distributed via cvmfs)
The same as above - but Virtual Folder is not compiled from sources -boots from cvmfs as well. This option is faster, the last stable release is distributed.
```
git clone https://github.com/h2020-westlife-eu/wp6-vm.git
cd wp6-vm/vf-standalone-bin/
vagrant up
```

### Standalone VF from Source Codes at SL7
Based on clean Scientific Linux 7 (instead of CernVM 4) - no dependency on online repositories at all. Initial VM image size = 665 MB, boot and bootstrap download 320 MB. Recommended for preparing off-line deployment.
```
git clone https://github.com/h2020-westlife-eu/wp6-vm.git
cd wp6-vm/vf-standalone-src-sl7/
vagrant up
```

### Repository Instance from source codes
Based on clean Scientific Linux 7, prepares Repository instance.
```
git clone https://github.com/h2020-westlife-eu/wp6-vm.git
cd wp6-vm/rep-standalone-src-sl7/
vagrant up
```


### Test configurations
Currently in testing stage containing third party software and tools, not guaranted to be working.
```
git clone https://github.com/h2020-westlife-eu/wp6-vm.git
cd wp6-vm/test-...
vagrant up
```
    
## Uninstalling VM
If you have used west-life VM before, you may remove previous VM by and update the vagrant box cache

    vagrant destroy
    vagrant box update    
        

## Working on different branch
By default, the master branch is cloned from sources. To change it, edit appropriate bootstrapsources.sh file and add/edit the following lines (change 'dev' with a desired git branch):

    # optional switch to branch
    cd west-life-wp6
    git checkout dev
    cd ..
## multiuser environment
By default, virtualfolder in VM will contain single user environment. To enable multiuser environment with VRE, edit bootstrapsources.sh file and uncomment the following line. Default user for VF will then be vagrant/vagrant:

    export PORTAL_DEPLOYMENT=1  

## Usage

After 'vagrant up' finished, the new virtual machine can be accessed via web browser (port 8080 is by default forwarded to VM, check VagrantFile or vagrant log for exact port number)

    http://localhost:8080/

Default login name to VRE is vagrant/vagrant.
    
Files of the current working directory of host are mounted into the guest <code>/vagrant</code>.

You can access the guest by SSH (default port 2222 is forwarded to VM)

    vagrant ssh

or access GUI in virtualbox (username/password: vagrant/vagrant).

## Uninstallation - Cleaning
*6.* After testing you may, stop (halt) the VM:
   
    vagrant halt
    
*7.* If you will not use the VM anymore, you can delete (destroy) the VM:
    
    vagrant destroy

