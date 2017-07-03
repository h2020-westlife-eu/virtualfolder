## Embedding Virtual Folder Component

In order to embed the Virtual Folder component into your web application you need to first declare the virtualfolderbaseurl variable pointing to the endpoint where virtualfolder services are available. In this case we will use public endpoint "https://portal.west-life.eu", but you may use endpoint of your private instance of Virtual Folder:
```html
<head>
...
  <script>
    var virtualfolderbaseurl="https://portal.west-life.eu";
  </script>
<head>
```

Now within the body of your web page you can include 
a component of virtual folder by adding following `<div>` tag:

```html
<div aurelia-app="[componentname]">
  <script src="https://portal.west-life.eu/virtualfolder/scripts/vendor-bundle.js"
          data-main="aurelia-bootstrapper"/>
  <script src="https://portal.west-life.eu/virtualfolder/scripts/app-bundle.js"/>
  Loading ...
</div>
```

The `[componentname]` could be one of the following:

* `filepicker/main` - File picker - allows to pick the file from Virtual Folder and it's WEBDAV URI is returned to managing page. See the demo at filepicker.html and filepickercomponent.html.
* `filemanager2/main` - File manager - allows to browse files in defined file providers \(demo view of PDB \). See the demo at filemanager.html.
* `dataset/main` - Dataset definition page - allows to define list of entries - PDB and Uniprot entries can be refined with
* `virtualfoldersettings/main` - Virtual Folder Settings page - allows to manage file providers \(B2DROP,Dropbox,Filesystem,...\)

The complete example of embeded component in your web may look:
```html
<html>
<head>
...
  <script>
    var virtualfolderbaseurl="https://portal.west-life.eu";
  </script>
<head>
<body>
<div aurelia-app="filemanager2/main">
  <script src="https://portal.west-life.eu/virtualfolder/scripts/vendor-bundle.js"
          data-main="aurelia-bootstrapper"/>
  <script src="https://portal.west-life.eu/virtualfolder/scripts/app-bundle.js"/>
  Loading ...
</div>
</body>
</html>
```
