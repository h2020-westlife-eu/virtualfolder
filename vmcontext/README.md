
## Release scripts
`release-scripts` contains scripts to publish binary files into CernVM-FS repository with binaries of West-life VF.

## User data
`user-data` contains scripts and configuration file to create user-data context for cernvm based virtual machine image.
- change user-data.sh script which should be executed as root during first boot
- execute makeseediso.sh which will create iso/ directory and creates an iso image

## Vagrant box
To make a vagrant box:
- download recent cernVM 4.0 RAW disk image e.g. from http://cernvm.cern.ch/releases/testing/cvm4/ucernvm-sl7.2.7-1.cernvm.x86_64.hdd
- convert it to vmdk - e.g. qemu-img convert -O vmdk ucern.hdd ucern.vmdk
- create new virtualbox machine, disk 1 with ucern.vmdk, disk 2 as new empty disk e.g. 40GB, disk 3 existing disk of user-data.vmdk
- execute makebox.sh or manually
  - execute: vagrant package --base virtualmachinename
  - replace the Vagrantfile inside the package.box with the Vagrantfile provided

