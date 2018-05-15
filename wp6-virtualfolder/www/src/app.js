
export class App {
  configureRouter(config, router) {
    config.title = 'West-Life Virtual Folder Router';

    config.map([
      {route: ['', 'dashboard'], name: 'dashboard', moduleId: 'pages/virtualfolderhome', nav: true, title: 'Dashboard'},
      {route: 'setting', name: 'setting', moduleId: 'pages/virtualfolderhome', nav: true, title: 'Setting'},
      {route: 'filemanager', name: 'filemanager', moduleId: 'pages/virtualfolderhome', nav: true, title: 'File Manager'},
      {route: 'filepicker', name: 'filepicker', moduleId: 'pages/virtualfolderhome', nav: true, title: 'File Picker'},

    ]);
    this.router = router;
  }

}
