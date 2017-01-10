# Virtual folder JS client components
## Introduction
The components uses aurelia framework to
- handle http communication
- bundle component into one vendor-bundle.js
- maintain source code and use best practices/patterns to compose/configure

## Features

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

## Usage

## Development

Prerequisites:

  1. restore npm modules <code>npm install</code>
  1. install aurelia-cli - globally <code>sudo npm install aurelia-cli -g</code>
  1. run <code>au run --watch</code>, if some dependencies are not met - install the module as in point 1.
  

## Further doc
http://internal-wiki.west-life.eu/w/index.php?title=D6.1
