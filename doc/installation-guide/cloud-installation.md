# Installing Virtual Folder instance into cloud

West-Life VM releases are maintained and distributed via appdb.egi.eu.

1. [https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm](https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm) - The standard OVA \(open virtual appliance\) image can be used to deploy West-Life VM into e.g. OpenNebula cloud environment.
2. [https://appdb.egi.eu/store/vappliance/west.life.vm](https://appdb.egi.eu/store/vappliance/west.life.vm) - RAW image can be used to deploy West-Life VM into OpenStack cloud environment

Both images are small \(18 MB, 23 MB respectively\) containing only CernVM 4 bootloader, which boots into standard Scientific Linux \(currently version 7.3\) and contextualizes it with West-Life specific software:

* Virtual Folder – private instance
* VRE – \(optional\) private instance delivering multiuser environment
* CCP4 – \(optional available after license agreement\) software suite containing software tools to process data produced by X-ray crystallography methods
* Scipion – image processing framework to process data produced mainly by electron microscopy methods.
* WeNMR – software tools to process data mainly of NMR methods

### Downloading VM image

You may download the latest West-life VM in the OVA compatible format from  
[https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm](https://appdb.egi.eu/store/vappliance/d6.1.virtualfoldervm)  
![](/doc/assets/DownloadAppDB.gif)

Alternatively you may use the RAW image for deployment into OpenStack at [https://appdb.egi.eu/store/vappliance/west.life.vm](https://appdb.egi.eu/store/vappliance/west.life.vm)

Use the downloaded image to deploy it to prefered provider. You may deploy the image in EGI resources - follow EGI documentation.

