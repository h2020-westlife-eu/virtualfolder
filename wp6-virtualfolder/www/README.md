# Virtual Folder Container web interface
## Reusing virtual folder components
The components can be reused in any HTML by adding this HTML snippet (where scripts/vendor-bundle.js links to VF web site):
```
<div aurelia-app="[componentname]/main">
   <script src="scripts/vendor-bundle.js" data-main="aurelia-bootstrapper"></script>
   Loading ...
</div>
```
Change [componentname] with appropriate name supplied in the list bellow:
These components are available:

- filepicker - File picker - allows to pick the file from Virtual Folder and it's WEBDAV URI is returned to managing page. See the demo at filepicker.html and filepickercomponent.html.
- filemanager2 - File manager - allows to browse files in defined file providers (demo view of PDB ). See the demo at filemanager.html.
- dataset - Dataset definition page - allows to define list of entries - PDB and Uniprot entries can be refined with

These components change settings in west-life portal or custom VM:
- virtualfoldersettings - Virtual Folder Settings page - allows to manage file providers (B2DROP,Dropbox,Filesystem,...)
- virtualfoldermodules - Virtual Folder VM Modules - available in custom VM - allows to enable optional modules available at Virtual Folder Container.

## Adding static content
The content is pure HTML in directory ```wp6-virtualfolder/www```. Apache server is by default configured with [SSI (Server Side Include)](http://httpd.apache.org/docs/current/howto/ssi.html) module. The ```header.html``` and ```footer.html``` can  be included into other html. To add new HTML page:
* add ```your.html``` and all relevant content (JS,CSS) into ```wp6-virtualfolder/www``` and it's subdirectories:
* edit ```your.html``` and 
include w3.css styles and other relevant styles and scripts
```
<head>
...
<!--#include file="heads.html" -->
...
</head>
```
include header of the pages shared among all of them, add this line up to the html content of ```your.html```:
```
<body>
<!--#include file="header.html" -->
...
</body>
```

(Optionaly) include footer, add this line bottom to the html content of ```your.html```:


```
<!--#include file="footer.html" -->

</body>
```
* edit ```header.html``` to contain link into your new page.
add e.g. following row into desirable place of the menu
```
<li><a href="your.html">Your Service</a></li>
```
## Development Instruction
The components uses aurelia framework to
- handle http communication
- bundle component into one vendor-bundle.js and transpile it from ES6 not yet widely supported to compatible Javascript implementation.
- maintain source code and use best practices/patterns to compose/configure the parts together

To use the components, no framework/library is needed. To develop the components, the following procedure is recommended:

  1. restore npm modules <code>npm install</code>
  1. install other npm modules <code>npm install browsersync-ssi http-proxy-middleware aurelia-http-client</code>
  1. install aurelia-cli - globally <code>sudo npm install aurelia-cli -g</code>
  1. run <code>au run --watch</code>, if some dependencies are not met - install the module as in point 1.



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


### b2dropcontrol
Deprecated - use virtualfoldersettings.

### Contact
H2020-westlife-wp6 (at) mailman.muni.cz

## Further doc
http://internal-wiki.west-life.eu/w/index.php?title=D6.2
