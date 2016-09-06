/**
 * Created by vagrant on 9/6/16.
 */

import 'fetch';
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();
export class App {
    constructor() {
        this.heading = "B2drop";
        this.username = "";
        this.usertoken = "";
    }

    addb2drop() {
        mypostdata = {UserName:this.username,Securetoken:this.usertoken}
        
    }

    removeTodo(todo) {
        let index = this.todos.indexOf(todo);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    }
}

