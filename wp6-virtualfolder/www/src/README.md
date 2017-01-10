# Virtual folder JS client components
## Introduction
The components uses aurelia framework to
- handle http communication
- bundle component into one vendor-bundle.js
- maintain source code and use best practices/patterns to compose/configure
##Features
###virtualfoldersettings
- List of configured providers - component aliastable
- Configure new provider - component genericcontrol
- Three providers supported - FileSystem(mounted folder),Dropbox(Oauth or securetoken),B2Drop(username password), the same for backend web service
- After adding - the list of configured providers is updated
###filemanager

###b2dropcontrol
Deprecated - use virtualfoldersettings.

##Usage

##Development
Prerequisites:
 1. restore npm modules <code>sudo npm install -g</code>
 2. install aurelia-clie <code>sudo npm install aurelia-cli -g</code>
 3. run <code>au run --watch</code>, if some dependencies are not met - install the module as in point 2.

##Further doc
http://internal-wiki.west-life.eu/w/index.php?title=D6.1
