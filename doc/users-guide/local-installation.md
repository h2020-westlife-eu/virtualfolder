# Local deployment 

Local installation is recommended to use the West-life in high performance environment with access to West-life desktop software directly.
There are 2 options 

## Downloading VM image

You may download the latest West-life VM in the OVA compatible format from 
https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm
![](/doc/assets/DownloadAppDB.gif)

Alternatively you may use the RAW image for deployment into OpenStack at https://appdb.egi.eu/store/vappliance/west.life.vm

### Deployment to cloud provider
This OVA can be used to deploy the West-life VM e.g. in OpenNebula environment, or in a VirtualBox. 

### Deployment to local VirtualBox
For testing purposes you may import the image into local installation of VirtualBox.

![](/doc/assets/ImportVM2.gif)

The OVA image initially 18 MB bootstraps operating system and additional software by downloadin about 100-200 MB, the initial bootstrap can take about several minutes. You can access the desktop directly.
![](/doc/assets/VMDesktop.gif)


## Local Installation using Vagrant
The Vagrant tool with connection to Virtualbox is used to prepare local environment, get the source codes, automate port forwarding, shared folders settings etc. 
Brief instructions are:
```
git clone https://github.com/h2020-westlife-eu/wp6-vm.git

cd wp6-vm

vagrant up
```
This will clone repository with scripts, get an initial VM image and starts the image with provisioning.

![](/doc/assets/VMVagrantUp.gif)

After succesfull installation, there should be message 'BOOSTRAP FINISHED, VM prepared to use'.

After 'vagrant up' finished, the new virtual machine can be accessed via web browser (port 8081 is by default forwarded to VM, check VagrantFile or vagrant log for exact port number)
```
http://localhost:8081/
```
You can access the desktop of the VM by going into VirtualBox.

Detailed instruction for installing West-life VM using Vagrant tool are at [Developer's guide](developers-guide.md).