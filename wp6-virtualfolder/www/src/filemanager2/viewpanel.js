
/**
 * Created by Tomas Kulhanek on 11/29/16.
 */

import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile} from '../filepicker/messages';
import {HttpClient} from 'aurelia-http-client';

export class  Viewpanel {
    static inject = [Element,EventAggregator, HttpClient];

    constructor(el,ea, httpclient) {
        this.element = el;
        this.ea = ea;
        this.httpclient = httpclient;
        this.ea.subscribe(SelectedFile, msg => this.viewfile(msg.file));
        //this.uid = new Date().valueOf().toString();
        this.sourceurl="";
        this.sourceformat="pdb";
    }

    attached() {
      angular.bootstrap(this.element.querySelector('#pdbviewer'), ['pdb.component.library']);
    }


}