import {EventAggregator} from 'aurelia-event-aggregator';

import {HandleLogin,MayLogout,RedirectLogin} from '../behavior';


export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.ea = ea;
    let location = window.location.protocol;
    this.islocalhost= location.startsWith('http:');
    this.handler = new RedirectLogin();
    this.ea.subscribe(HandleLogin, msg => this.handler.handlelogin());
    this.ea.subscribe(MayLogout, msg => this.handler.maylogout());

  }

}
