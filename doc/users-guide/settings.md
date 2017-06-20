# Setting

## Connecting Scattered Data

In order to use the Virtual Folder, you need to connect some storage where your scattered data are accessible.

```
Add new file provider -> Choose provider
```

![](/doc/assets/Settings.PNG)

The B2DROP, Dropbox and any storage provider offering a [standard WebDAV connection](https://www.ietf.org/rfc/rfc4918.txt) are supported.

## B2DROP

[B2DROP is a secure and trusted data exchange service for researchers and scientists.](https://eudat.eu/services/b2drop) West-life portal uses B2DROP TO store, upload and download AND share the data files.

You need to create B2DROP account first at [https://b2drop.eudat.eu/pwm/public/NewUser?](https://b2drop.eudat.eu/pwm/public/NewUser?)

```
Select B2DROP -> Fill in the existing B2DROP username and password -> click Add
```

![](/doc/assets/SettingsB2DROP.PNG)  


After clicking the Add button, and if everything works well, the connected B2DROP account should appear in the list:

  
![](/doc/assets/Settings1.PNG)

## DropBox

DROPBOX is a commercial data store and exchange service. West-life portal can use your DROPBOX account to access and download your data files.

```
Select DropBox -> click 'Connect to DROPBOX'
```

![](/doc/assets/SettingsDropbox1.PNG)

You will be redirected to sign in or create Dropbox account.   
![](/doc/assets/SettingsDropbox2.PNG)  
After signing. You'll be asked to allow Virtual Folder to access your data:

```
Click Allow
```

![](/doc/assets/SettingsDropbox3.PNG)  
You'll be redirected back to Virtual Folder. You should see a unique secure token being filled into the secure token field. Do not change it. You can optionally fill the 'Alias'.

```
click Add
```

![](/doc/assets/SettingsDropbox4.PNG)  


After clicking the Add button, and if everything works well, the connected DROPBOX account should appear in the list:

  
![](/doc/assets/SettingsDropbox5.PNG)

## WEBDAV

If your data provider allows a WEBDAV protocol, this can be connected.

```
Add new file provider -> Select 'WEBDAV'
```

![](/doc/assets/SettingsWebdav1.PNG)

```
Fill in the WebDAV URL and account information -> click Add
```

![](/doc/assets/SettingsWebdav2.PNG)  
After clicking the Add button, and if everything works well, the connected WEBDAV provider should appear in the list.

