# Virtual folder

## Introduction
This "Virtual Folder" provides a unified access mechanism to files stored in a variety of locations including the local file system, and B2DROP and other cloud storage facilities. It is developed in work package WP6 by the [West-Life H2020 project](https://west-life.eu), which is running from 2015 to 2018. It provides application level services usable for structural biology use cases and follows [the structural biology data lifecycle](http://internal-wiki.west-life.eu/w/images/9/9c/Assessment_of_the_life_cycle_of_structural_data_and_comparison_with_other_scientific_data.docx). Data management work package WP6 build on existing infrastructure for storing and accessing data to create a "Virtual Folder". 
Full documentation is rendered in [HTML docs](https://h2020-westlife-eu.gitbooks.io/virtual-folder-docs/content/) or [PDF docs](https://www.gitbook.com/download/pdf/book/h2020-westlife-eu/virtual-folder-docs)

## Usage

A public installation of the  Virtual Folder is available at [West-Life portal](https://portal.west-life.eu/virtualfolder).
Follow [User's guide](doc/users-guide.md) for further details how to use it.

## Installation

Virtual Folder can be installed: 
1. from source codes
2. from binaries at cernvm-fs
3. from cloud template, contextualized to binaries at cernvm-fs

For all the installation options follow: [Installation guide](doc/installation-guide.md).

### Brief installation instruction from source codes 

Recommended configuration for private deployment of virtual machine with Virtual Folder:
* Minimal: 1 CPU, 2 GB RAM, 50GB disk space.
* Recommended: 4 CPU, 8 GB RAM, 100 GB disk space
* Desktop, Server OS: Windows (tested on Windows 7, Windows 2012), Linux (tested on Ubuntu 14.04 LTS, Ubuntu 16.04 LTS), VirtualBox 5.1.6+, Vagrant 1.8.6+
* Cloud OS: OpenNebula, OpenStack, or any other supporting OVA images.

```bash
git clone https://github.com/h2020-westlife-eu/west-life-wp6

cd west-life-wp6

vagrant up
```

The new virtual machine can be accessed via web browser `http://[vm.ip.address]:[port]/`
By default, `http://localhost:8080`
Virtual folder provides WEBDAV API at `http://[vm.ip.address]:[port]/webdav` e.g. `http://localhost:8080/webdav`

Inside VM, the files of the current working directory of host are mounted into <code>/vagrant</code>
and the repositories of virtual folder are accessible at <code>/home/vagrant/work</code>

## Integration

The functionality of the Virtual Folder can be integrated into other portal or web application.
The recommended method is to link the existing component using cross-document messaging mechanism - e.g.
for picking a file from Virtual Folder by using the File Picker component.

Follow [Integration guide](doc/integration-guide.md) for further details.

## Development

In order to test, contribute to source codes and prepare  virtual machine environment with source codes, follow [Development installation](doc/installation-guide/development-installation.md). Documents are maintained inside /docs folder and built from dev-docs branch, occasionally merged to master branch; in sync with [Gitbook](https://www.gitbook.com/book/h2020-westlife-eu/virtual-folder-docs/details)

## Release Notes

  * 28/06/2017 - UI improvement, docs in sync with gitbook and /doc folder in dev-docs branch
  * 23/06/2017 - added support for source code installation/binary installation
  * 01/05/2017 - Added Dataset demo integrates some web PDB components to visualize features of PDB and UniProt entries
  * 01/04/2017 - Added Upload Dir Picker component and updated integration guide
  * 07/03/2017 - public deployment integrated with SSO authentication ARIA at www.structuralbiology.eu
  * 25/11/2016 - Updated vagrant boxes to use uCernVM 2.7.7 bootloader, updated OVA images in https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm/vaversion/latest and vagrant boxes, do "vagrant box update", bug fixes, consolidated initial web page and design, fixed/added background services
  * 26/10/2016 - moved VagrantFile to new repository https://github.com/h2020-westlife-eu/wp6-vm, updated base box with uCernVM2.7.4 bootloader for CernVM 4 fixes security bug 'dirty COW' and aufs bug in kernel, https://atlas.hashicorp.com/westlife-eu, 
  * tested on Windows 7 64 bit, vagrant 1.8.6 + VirtualBox 5.1.6, vagrant 1.8.1, 1.8.4 + VirtualBox 5.0.26, note vagrant < 1.8.6 requires VirtualBox 5.0.x, doesn't require VirtualBox extension pack, download from https://www.virtualbox.org/wiki/Download_Old_Builds_5_0
  * tested on  Ubuntu 14.04 LTS, default vagrant 1.4.3 needs to be updated to 1.8.6), default VirtualBox 4.3.36 works
