#Virtual folder - technical report
##Integration of services and apps 
####By Tomas Kulhanek

##Introduction
West-Life is a H2020 Virtual Research Environment project that will provide the application level services specific to uses cases in structural biology. 
Data management work package WP6 build on existing infrastructure for storing and accessing data. It provides application level service usable for structural biology use cases and follows structural biology data lifecycle (Report ...).
The WP6 is distributed as a vagrant package. Configuration files and scripts which initiates self deployment, installation and configuration of prototype virtual machine.
#Installation
Prerequisites:

 1. Vagrant - tool for automation of virtual machine deployment. Download and install vagrant from https://www.vagrantup.com/
 1.  Virtualbox - VM stack. Download and install virtualbox from https://www.virtualbox.org/
Download and unpack west-life-wp6 package from git://

Optionally, if you are behind proxy, download and install proxyconf plugin

    export http_proxy=http://user:password@host:port
    export https_proxy=https://user:password@host:port
    vagrant plugin install vagrant-proxyconf

Optionally, edit the west-life-wp6/vagrant/Vagrantfile to match the http-proxy and https-proxy to your environment:

    vagrant/Vagrantfile
    ...
    config.proxy.http     = "http://yourproxy:8080"
    config.proxy.https    = "http://yourproxy:8080"
    config.proxy.no_proxy = "localhost,127.0.0.1"

Open command-line (e.g. cmd, cygwin or terminal)

    cd west-life-wp6
    cd vagrant
    vagrant up

This will start to download and install appropriate packages - depending on network speed it will take several to several tens of minutes - downloading 200 MB of data.
##Usage
The new virtual machine can be access by SSH (by default the 2222 port is forwarded to VM)

    vagrant ssh

Or via web browser (port 8080 is forwarded to VM)

    http://localhost:8080/

##Current state of prototype implementation
After self deployment and installation the virtual machine provides 3 basic services:

 1. Web application at http://localhost:8080
	 - Optional connection to b2drop repository, directory browsing
	 - Processing application - artefacts can be dragged and dropped into appropriate workflows
	 - Integration with public PDB repository, WEBGL viewer of PDB from public repository and from PDB data stored within package.


 2. WebDAV protocol to the shared data at http://localhost:8080/webdav/
 3. Preinstalled and preconfigured CCP4 suite to allow further data refining, processing, analysis and automatic execution of XIA2 workflow on new data in webdav/mydata/xia folder

The webapp is currently based as a set of customized PHP plugins and shell scripts for DOKUWIKI - PHP wiki engine on Apache web server. Further development will probably not continue with PHP server side processing and will follow rather RESTful web services (Java, Python, ...) and RIA with HTML5 and AJAX capabilities. 
##TODO
Highlighted topics, which are not yet implemented (07Apr2016).

  * WebDAV folders from EUDAT (B2DROP / B2SAFE)
  * Create project folder, **with CERIF metadata, and get its PID**
  * UI to view files for research project, using WebDAV client
  * VM mount for WP4 using davfs2 (Vagrant script) capable of exporting output and using input from B2DROP also B2SHARE, when that supports WebDAV.
  * **Multiplex WebDAV view (a federation of data)**
	* probably use http://milton.io/
	* And with demountable device
  * **WebDAV view of iCAT-FUSE / PaNData / CCP4 / dCache / Zenodo resources**
    * More as required
  * **Input from WP4**
	* Add to ELIXIR Tools and Data Services Registry and B2FIND
	* Data management for single particle electron microscopy
	* Consider proposing Instruct becomes an Associate Partner of EUDAT







