# Local deployment

In order to install/launch legacy software and have access to a desktop you may install the virtual folder with selected software suites either on your cloud provider, or locally on your server, cluster, workstation or even laptop. 

The standard procedure is to download virtual machine template image from appDB (18MB), if you would like to have testing environment Follow [Development installation](Development installation) chapter. 

## Downloading VM image

You may download the latest West-life VM in the OVA compatible format from   
[https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm](https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm)  
![](/doc/assets/DownloadAppDB.gif)

Alternatively you may use the RAW image for deployment into OpenStack at [https://appdb.egi.eu/store/vappliance/west.life.vm](https://appdb.egi.eu/store/vappliance/west.life.vm)

### Deployment to local VirtualBox

For testing purposes you may import the image into local installation of VirtualBox.

![](/doc/assets/ImportVM2.gif)

The OVA image initially 18 MB bootstraps operating system and additional software by downloadin about 100-200 MB, the initial bootstrap can take about several minutes. You can access the desktop directly.  
![](/doc/assets/VMDesktop.gif)
