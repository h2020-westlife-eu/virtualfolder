import {PLATFORM} from 'aurelia-pal';
export function configure(config) {
  //config.globalResources([]);
  config.globalResources(
    PLATFORM.moduleName('./irep.html'),
    PLATFORM.moduleName('./irepdemo.html'),
    PLATFORM.moduleName('./iadmin.html'),
    PLATFORM.moduleName('./istaff.html'),
    PLATFORM.moduleName('./ifile.html'),
    PLATFORM.moduleName('./ilink.html'),
    PLATFORM.moduleName('./ilinkfolder.html'),
    PLATFORM.moduleName('./icopy'),
    PLATFORM.moduleName('./ifolder.html'),
    PLATFORM.moduleName('./idata.html'),
    PLATFORM.moduleName('./iproject.html'),
    PLATFORM.moduleName('./itable.html'),
    PLATFORM.moduleName('./ispincog.html'),
    PLATFORM.moduleName('./idelete.html'),
    PLATFORM.moduleName('./inext.html'),
    PLATFORM.moduleName('./icopyicon.html'),
    PLATFORM.moduleName('./icogs.html'),
    PLATFORM.moduleName('./imetadata.html')
  );

}
