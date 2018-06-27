
export class App {
  configureRouter(config, router) {
    config.title = 'West-Life Virtual Folder Router';

    config.map([
      {route: ['', 'dashboard'], name: 'dashboard', moduleId: 'pages/virtualfolderhome', nav: true, title: 'Dashboard'},
      {route: 'setting', name: 'setting', moduleId: 'pages/virtualfoldersetting', nav: true, title: 'Setting'},
      {route: 'filemanager', name: 'filemanager', moduleId: 'pages/filemanager', nav: true, title: 'File Manager'},
      {route: 'filepicker', name: 'filepicker', moduleId: 'pages/filepicker', nav: true, title: 'File Picker'}

    ]);
    config.mapUnknownRoutes('pages/virtualfoldersetting');
    //config.fallbackRoute('setting');
    this.router = router;
  }

}
