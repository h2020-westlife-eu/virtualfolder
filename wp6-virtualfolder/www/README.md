# Virtual Folder Container web interface
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

```
(Optionaly) include footer, add this line bottom to the html content of ```your.html```:
```
<!--#include file="footer.html" -->
</body>
...

```
* edit ```header.html``` to contain link into your new page.
add e.g. following row into desirable place of the menu
```
<li><a href="your.html">Your Service</a></li>
```
