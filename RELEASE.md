# Virtual folder
This document describes the release procedure
## Release
* make release in https://github.com/h2020-westlife-eu/west-life-wp6/releases
* if the VM bootloader changed, VM contextualization changed, use vmcontext/* scripts to prepare vagrant boxes and release them
** three boxes are prepared: westlife-eu/wp6-cernvm - for development purposes, basic VM is prepared, westlife-eu/wp6-cernvm-dlproxy - the same with proxy settings for STFC/DL. westlife-eu/wp6-cernvm-cloud - for production purposes, basic VM bootstraps the West-life specific without need of other vagrant configuration.
** vmcontext/makebox.sh expects these VM (as templates) in local virtualbox: westlife1cernvm, westlife1cernvmdl and westlife1cernvmcloud
** vmcontext/makebox.sh produced westlife-cernvm4.box westlife-cernvm4dl.box and west-life-cernvmcloud.box
** upload and release vagrant boxes in atlas.hashicorp.com (current owner tomas.kulhanek)
** boxes are available in vagrant context, e.g. "vagrant init westlife-eu/wp6-cernvm-cloud; vagrant up"
* make new version in https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm 
** export the westlife1cernvmcloud to OVA - or use the west-life-cernvmcloud.box
** publish this OVA as new version

