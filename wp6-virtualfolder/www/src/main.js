import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import 'babel-polyfill';
import * as Bluebird from 'bluebird';

//initializing fetch polyfill
//import 'fetch';

Bluebird.config( { warnings: { wForgottenReturn: true }, longStackTraces: false } );

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .feature(PLATFORM.moduleName('resources/index'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
  //hack include other static pages in webpack bundle
  //PLATFORM.moduleName('provenance/main');
  PLATFORM.moduleName('syncsetting/main');
  PLATFORM.moduleName('uploaddirpicker/main');
  PLATFORM.moduleName('filepicker/main');

}
