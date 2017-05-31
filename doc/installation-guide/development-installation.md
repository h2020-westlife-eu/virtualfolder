# Development installation

Prerequisites:

 1. Vagrant - tool for automation of virtual machine deployment. Download and install vagrant from https://www.vagrantup.com/
 2. Virtualbox - VM stack. Download and install virtualbox https://www.virtualbox.org/wiki/Downloads

Download this metarepository [ZIP (4kB)](https://github.com/h2020-westlife-eu/wp6-vm/archive/master.zip) and unzip it into some [wp6-vm directory] or clone this repository https://github.com/h2020-westlife-eu/wp6-vm.git.

*1.* Open command-line (e.g. cmd, cygwin or terminal) and cd to directory where wp6-vm is unzipped/cloned
     
    cd [wp6-vm directory]

    
*2.* (Optionally), if you have used west-life VM before, update the vagrant box cache

    vagrant box update    

*3.* (Optionally), if you want install WP6 from source codes,
   edit Vagrantfile and uncomment bootstrapsources.sh and comment bootstrapcvmfs.sh lines:

 ```  
   config.vm.provision "shell",  path: "bootstrapsources.sh"
   # config.vm.provision "shell",  path: "bootstrapcvmfs.sh"
 ```

*4.* (Optionally), based on step 3. the (master) branch from sources are cloned, to change it, edit the bootstrapcloud.sh file and uncomment/edit the following three lines (change 'dev' with a desired git branch):

    # optional switch to branch
    cd west-life-wp6
    git checkout dev
    cd ..

*5.* Start the vagrant box:

    vagrant up    

This will start VM template CernVM, boots to Scientific Linux 7.2 and performs some bootstrap scripts. Depending on network speed it will take several to several tens of minutes - downloading about 200 MB of data. Wait until "BOOTSTRAP FINISHED", otherwise the process failed, investigate the log and repeat the step 5.

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
    
*7.* If you'll not use the VM anymore, you can delete (destroy) the VM:
    
    vagrant destroy

