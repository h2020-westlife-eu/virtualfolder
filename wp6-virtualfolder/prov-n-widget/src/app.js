import {EventAggregator} from 'aurelia-event-aggregator';
import {ProvenanceData} from "./provenance/messages";
import {Vfstorage} from "./components/vfstorage";
import {ProjectApi} from "./components/projectapi";

export class App {
  static inject = [EventAggregator,ProjectApi];

  constructor(ea,pa) {
    this.ea=ea;
    this.pa=pa;
  }

  attached() {
    //get hash param 'url' e.g. #url=http://provenance/dataset/1/provenance
    this.provnurl=Vfstorage.getParams(window.location.hash).url;
    //get the content from the url
    this.pa.fetchTextLog(this.provnurl)
      .then(data => {
        //send the content to listening component
        this.ea.publish(new ProvenanceData(data));
      });
  }

  detached() {
  }

}
