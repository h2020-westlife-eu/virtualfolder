/**
 * created by Tomas Kulhanek on 9/6/16.
 */
import {HttpClient} from 'aurelia-http-client';

let client = new HttpClient();

export class Actions {
    constructor() {
        client.configure(config=> {
            config.withHeader('Accept', 'application/json');
            config.withHeader('Content-Type', 'application/json');
        });
    }

    attached() {
    }

    help(){
    }

    menu(){
    }

    view(){
    }

    edit(){
    }


}

