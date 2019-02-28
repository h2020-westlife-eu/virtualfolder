
## Release scripts
`release-scripts` contains scripts to publish binary files into CernVM-FS repository with binaries of West-life VF.
In order to release to cvmfs first
- modify release.sh and modify version number in variable `VERSION`, e.g. `export VERSION=18.11`
- check you have X509 keys, you may generate them from p12 file, if it is present in /vagrant directory
- execute ./release.sh
- if new version is established, login to cvmfs, using e.g. script `gsissh.sh` and change the link `latest` to link to `[version number]` e.g. for `18.11` execute following:
```
cd software/virtualfolder
ln -s 18.11 latest
```

## User data
`user-data` contains scripts and configuration file to create user-data context for cernvm based virtual machine image. As it refers to CernVM-FS repository it doesn't need to be updated so often (major change in cernvm 4 image (e.g. kernel etc.)).
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

