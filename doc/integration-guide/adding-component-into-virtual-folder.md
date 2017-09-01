# Adding component to Virtual Folder [DRAFT]
- start component as a service inside Virtual Folder VM or container
- configure the proxy to redirect to the component
- Vf filesystem is at /home/vagrant/work so the external service can use it directly, webdav repositories are synchronized by davfs module, dropbox and ther are not synchronized.