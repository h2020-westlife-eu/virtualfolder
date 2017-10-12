/**
 * Created by Tomas Kulhanek on 2/21/17.
 */

import {HandleLogin,MayLogout,ShowLoginButton} from '../behavior';
import {EventAggregator} from 'aurelia-event-aggregator';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.ea = ea;
    this.handler = new ShowLoginButton();
    //shows logout button by default
    //if it detects that it is not logged in - e.g. 403 returned - shows Login button instead
    this.ea.subscribe(HandleLogin, msg => this.handler.handlelogin());
    this.ea.subscribe(MayLogout, msg => this.handler.maylogout());
  }


}
