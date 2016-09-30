# Virtual folder - technical report
## Integration of services and apps 
#### By Tomas Kulhanek

## Introduction
West-Life is a H2020 Virtual Research Environment project that will provide the application level services specific to uses cases in structural biology. 
Data management work package WP6 build on existing infrastructure for storing and accessing data. It provides application level service usable for structural biology use cases and follows structural biology data lifecycle (Report ...).
The WP6 is distributed as a vagrant package. Configuration files and scripts which initiates self deployment, installation and configuration of prototype virtual machine.
# Installation
Prerequisites:

 1. Vagrant - tool for automation of virtual machine deployment. Download and install vagrant from https://www.vagrantup.com/
 2. Virtualbox - VM stack. Download and install virtualbox (version 5.0.x compatible with vagrant, note version 5.1 not compatible with vagrant yet) from https://www.virtualbox.org/wiki/Download_Old_Builds_5_0
Download and unpack west-life-wp6 package from https://github.com/h2020-westlife-eu/west-life-wp6/archive/master.zip

Optionally, if you are behind proxy, download and install proxyconf plugin

    export http_proxy=http://user:password@host:port
    export https_proxy=https://user:password@host:port
    export no_proxy=localhost
    vagrant plugin install vagrant-proxyconf

Open command-line (e.g. cmd, cygwin or terminal)

    cd wp6-virtualfolder
    vagrant up

This will start to download and install OS and configure appropriate packages - depending on network speed it will take several to several tens of minutes - downloading 200 MB of data.

## Usage
The new virtual machine can be accessed by SSH (by default the 2222 port is forwarded to VM)

    vagrant ssh

or via GUI in virtualbox (username/password: vagrant/vagrant)

Or via web browser (port 8080 is by default forwarded to VM)

    http://localhost:8080/

##Current state of prototype implementation
After self deployment and installation the virtual machine provides 3 basic services:

 1. Web application at http://localhost:8080
	 - Optional connection to b2drop repository, directory browsing
	 - Processing application - artefacts can be dragged and dropped into appropriate workflows
	 - Integration with public PDB repository, WEBGL viewer of PDB from public repository and from PDB data stored within package.


 2. WebDAV protocol to the shared data at http://localhost:8080/webdav/

The webapp is currently based as a set of customized PHP plugins and shell scripts for DOKUWIKI - PHP wiki engine on Apache web server. Further development will probably not continue with PHP server side processing and will follow rather RESTful web services (Java, Python, ...) and RIA with HTML5 and AJAX capabilities. 
##Further doc
http://internal-wiki.west-life.eu/w/index.php?title=D6.1
