import {EventAggregator} from 'aurelia-event-aggregator';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.showprovider = false;
    this.ea = ea;
  }

}
