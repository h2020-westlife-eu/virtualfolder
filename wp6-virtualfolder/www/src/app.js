import { PLATFORM } from "aurelia-framework";

export class App {
  configureRouter(config, router) {
    config.title = 'West-Life Virtual Folder Router';

    config.map([
      {route: ['', 'dashboard'], name: 'dashboard', moduleId: PLATFORM.moduleName('pages/virtualfolderhome'), nav: true, title: 'Dashboard'},
      {route: 'setting', name: 'setting', moduleId: PLATFORM.moduleName('pages/virtualfoldersetting'), nav: true, title: 'Setting'},
      {route: 'filemanager', name: 'filemanager', moduleId: PLATFORM.moduleName('pages/filemanager'), nav: true, title: 'File Manager'},
      {route: 'filepicker', name: 'filepicker', moduleId: PLATFORM.moduleName('pages/filepicker'), nav: true, title: 'File Picker'}

    ]);
    config.mapUnknownRoutes('pages/virtualfoldersetting');
    //config.fallbackRoute('setting');
    this.router = router;
  }

}
