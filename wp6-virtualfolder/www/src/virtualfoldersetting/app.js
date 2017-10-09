import {EventAggregator} from 'aurelia-event-aggregator';
import {RedirectLogin} from '../behavior';
import {HandleLogin} from '../behavior';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.ea = ea;
    let location = window.location.protocol;
    this.islocalhost= location.startsWith('http:');

    this.handler = new RedirectLogin();
    this.ea.subscribe(HandleLogin, msg => this.handler.handlelogin());

  }

}
