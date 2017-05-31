# Virtual folder

## Introduction
West-Life is a H2020 Virtual Research Environment project that between years 2015-2018 develops the application level services specific to uses cases in structural biology.
Data management work package WP6 build on existing infrastructure for storing and accessing data. It provides application level service usable for structural biology use cases and follows structural biology data lifecycle (Report ...).
The WP6 is distributed as a vagrant package. Configuration files and scripts which initiates self deployment, installation and configuration of prototype virtual machine.


## Usage
Virtual Folder is available at West-Life portal https://portal.west-life.eu

Follow [User's guide](doc/users-guide.md) for further details.

## Installation

To have a quick private deployment of the virtual folder, follow the instruction at https://github.com/h2020-westlife-eu/wp6-vm.git.

After installation, the new virtual machine can be accessed via web browser `http://[vm.ip.address]:[port]/`
By default, vagrant tool forwards the port 8080 to the virtual machine 80, thus you can access `http://localhost:8080`
Virtual folder provides WEBDAV API at `http://[vm.ip.address]:[port]/webdav` e.g. `http://localhost:8080/webdav`

Files of the current working directory of host are mounted into <code>/vagrant</code>

Repositories of virtual folder are accessible at <code>/home/vagrant/work</code>

Follow [Installation guide](doc/installation-guide.md) fo further details.

## Integration

Virtual Folder can be integrated into any other portal or web application as linked or embeded component.
The typical usages is to pick a file from Virtual Folder by - File Picker component returns unique URL, which
can be used to access the file - download, upload, change.

Follow [Integration guide](doc/integration-guide.md) for further details.

## Development

Clone this git repository or follow [Development installation](doc/installation-guide/development-installation.md)
to prepare complete virtual machine environment with source codes.

## Release Notes

  * 01/05/2017 - Added Dataset demo integrates some web PDB components to visualize features of PDB and UniProt entries
  * 01/04/2017 - Added Upload Dir Picker component and updated integration guide
  * 07/03/2017 - public deployment integrated with SSO authentication ARIA at www.structuralbiology.eu
  * 25/11/2016 - Updated vagrant boxes to use uCernVM 2.7.7 bootloader, updated OVA images in https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm/vaversion/latest and vagrant boxes, do "vagrant box update", bug fixes, consolidated initial web page and design, fixed/added background services
  * 26/10/2016 - moved VagrantFile to new repository https://github.com/h2020-westlife-eu/wp6-vm, updated base box with uCernVM2.7.4 bootloader for CernVM 4 fixes security bug 'dirty COW' and aufs bug in kernel, https://atlas.hashicorp.com/westlife-eu, 
  * tested on Windows 7 64 bit, vagrant 1.8.6 + VirtualBox 5.1.6, vagrant 1.8.1, 1.8.4 + VirtualBox 5.0.26, note vagrant < 1.8.6 requires VirtualBox 5.0.x, doesn't require VirtualBox extension pack, download from https://www.virtualbox.org/wiki/Download_Old_Builds_5_0
  * tested on  Ubuntu 14.04 LTS, default vagrant 1.4.3 needs to be updated to 1.8.6), default VirtualBox 4.3.36 works

## Further doc
http://internal-wiki.west-life.eu/w/index.php?title=D6.1
