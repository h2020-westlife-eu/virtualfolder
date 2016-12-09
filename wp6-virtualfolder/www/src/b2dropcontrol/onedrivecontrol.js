/**
 * Created by vagrant on 12/8/16.
 */
/**
 * Created by vagrant on 9/6/16.
 */
import {HttpClient} from 'aurelia-http-client';
import {AControl} from 'acontrol';
let client = new HttpClient();

export class Onedrivecontrol extends AControl {
  constructor() {
    super();
    this.heading = "ONEDRIVE connector";
    this.clientid = "xUfizTokQv6mAiZ9sgzQnm0";
    this.servicecontext= "onedriveconnector";
  }
}
