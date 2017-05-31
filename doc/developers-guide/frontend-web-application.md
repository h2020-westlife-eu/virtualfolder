
# Frontend 

The source codes of frontend components are 
at https://github.com/h2020-westlife-eu/west-life-wp6/tree/master/wp6-virtualfolder/www

Following Chapter 6. Section 1. Step 4. the sources will be in `/vagrant/west-life-wp6/wp6-virtualfolder/www`

Frontend application is based on HTML (5) and Javascript (Ecmascript version 6) uses aurelia framework to
- handle http communication
- bundle component into vendor-bundle.js and app-bundle.js and transpile it to ES5 - compatible Javascript implementation in most web browsers in the year 2017.
- maintain source code and use best practices/patterns to compose/configure the parts together

To use/integrate the components see [[Embedding components guide]]

To develop/maintain the components, the following procedure is recommended:

  1. restore npm modules 
```
npm install
```
  1. install aurelia-cli - globally 
```
sudo npm install aurelia-cli -g
```
  1. run `au run --watch`, if some dependencies are not met - install the module using `npm install <module-name>`

### Adding static content

To add static content into West-life VF web UI, commit it to directory `wp6-virtualfolder/www`. Apache server on the portal and on custom VM is by default configured with [SSI (Server Side Include)](http://httpd.apache.org/docs/current/howto/ssi.html) module. The `header.html` and `footer.html` can  be included into other html. To add new HTML page:
* add `your.html` and all relevant content (JS,CSS) into `wp6-virtualfolder/www` and it's subdirectories:
* edit `your.html` and 
include w3.css styles and other relevant styles and scripts
```
<head>
...
<!--#include file="heads.html" -->
...
</head>
```
include header of the pages shared among all of them, add this line up to the html content of `your.html`:
```
<body>
<!--#include file="header.html" -->
...
</body>
```

(Optionaly) include footer, add this line bottom to the html content of `your.html`:

```
<!--#include file="footer.html" -->
</body>
```
* edit `header.html` to contain link into your new page.
add e.g. following row into desirable place of the menu
```
<li>
<a href="your.html">Your Service</a></li>
```

### virtualfoldersettings

- List of configured providers - component aliastable
- Configure new provider - component genericcontrol - lists available providers
- Three providers supported - FileSystem(mounted folder),Dropbox(Oauth or securetoken),B2Drop(username password), the same for backend web service
- After adding - the list of configured providers is updated
- If returned from dropbox auth url - the url contains access_token - reopens the dropbox add dialog with securetoken readonly.
- can add multiple instances of same provider: Dropbox (dropbox_1, dropbox_2) ...
- cannot add multiple instances of these providers: B2Drop, it is manageable by modifying shell scripts


### filemanager
- Two panels
- List of files and directories
  - first level - list of aliases - virtual folders leading to the providers
  - second level - list of files under the root of the file provider, ...
- Click on directory
  - go into directory
  - go up (if directory is ..)
- Click on file
  - PDB file, triggers action to view the pdb file on the opposite panel
  - on (non-webdav provider) (Dropbox), the file is downloaded first to virtual folder server -
  HTTP 302 redirect is returned to webdav pointing to the location of the file on the virtual folder server.
  - if such file is clicked again in future - local copy on virtual folder server is viewed
  - issue if the file is changed on Dropbox provider.
  - on (webdav provider) (B2DROP), the file is processed by davfs - cached locally, cache is updated if the file is changed on B2DROP

### Contact
H2020-westlife-wp6 (at) mailman.muni.cz

## Design and analysis docs
http://internal-wiki.west-life.eu/w/index.php?title=D6.2

