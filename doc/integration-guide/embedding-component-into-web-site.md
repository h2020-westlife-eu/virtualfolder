## Embedding Virtual Folder Component \[DRAFT\]

The components can be reused in any HTML by adding this HTML snippet. The content between `<div></div>` will be filled by the component:

```html
<body>
...
<div aurelia-app="[componentname]/main">
<script src="https://portal.west-life.eu/virtualfolder/scripts/vendor-bundle.js" 
data-main="aurelia-bootstrapper">
</script>
   Loading ...
</div>
...
</body>
```

Replace \[componentname\] with an appropriate component name which should appear within the specified `<div>`

These components are available:

* filepicker - File picker - allows to pick the file from Virtual Folder and it's WEBDAV URI is returned to managing page. See the demo at filepicker.html and filepickercomponent.html.
* filemanager2 - File manager - allows to browse files in defined file providers \(demo view of PDB \). See the demo at filemanager.html.
* dataset - Dataset definition page - allows to define list of entries - PDB and Uniprot entries can be refined with

These components change settings in west-life portal or custom VM:

* virtualfoldersettings - Virtual Folder Settings page - allows to manage file providers \(B2DROP,Dropbox,Filesystem,...\)
* virtualfoldermodules - Virtual Folder VM Modules - available in custom VM - allows to enable optional modules available at Virtual Folder Container.



