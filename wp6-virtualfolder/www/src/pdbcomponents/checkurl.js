/**
 * Created by Tomas Kulhanek on 5/19/17.
 */
import {bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; //fetch

/** Checkurl component <checkurl url="some url">content</checkurl>
 * checks the url provided in url attribute,
 * if the HEAD request returns HTTP 200, then the content inside the component is
 * added into the resulting DOM, otherwise no DOM is rendered and no further processing
 * performed -e.g. subsequent calls to the url etc.
 */
export class Checkurl {
  static inject = [HttpClient];
  @bindable failmessage="No data available for this structure.";
  @bindable url;
  constructor(httpclient){
    this.client = httpclient;
    this.showit=false;
    //this.message="";
  }

  attached(){
    //console.log("Checkurl component:"+this.url+" message:"+this.failmessage);

    this.client.fetch(this.url, {method: 'HEAD'})
      .then(response => {
        //console.log("checkurl response:");
        //console.log(response);
        if (response.status===200) this.showit=true;
        //this.message = this.failmessage;
      })
      .catch(error =>{
        this.showit=false;
        console.log('checkurl error:'+error);
        //this.message = this.failmessage;
      });
  }

}

