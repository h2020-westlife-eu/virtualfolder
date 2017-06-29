/**
 * Created by Tomas Kulhanek on 11/29/16.
 */

import {EventAggregator} from 'aurelia-event-aggregator';
import {SelectedFile,VisualizeFile} from '../filepicker/messages';
import {HttpClient} from 'aurelia-http-client';


export class  Viewpanelpv {
  static inject = [EventAggregator,HttpClient];
    constructor(ea,httpclient) {
      this.ea = ea;
      this.httpclient = httpclient;
      this.ea.subscribe(VisualizeFile, msg => this.viewfile(msg.file));
    }

    attached(){
        //console.log('viewpanel.attached()')
      this.viewerdom = $(".fileviewer")[0];
      //console.log(this.viewerdom);
      var options = {
        width: '1200',
        height: '600',
        antialias: true,
        quality : 'medium'
      };
      // insert the viewer under the Dom element with id 'gl'.
        console.log(this);
        console.log(this.viewer);
        if (!this.viewer)
            this.viewer = pv.Viewer(this.viewerdom, options);
        }

    viewfile(file) {
      //if (file.webdavuri.endsWith('pdb')) {
        this.fileurl = file.webdavuri;
        console.log("viewfile()");
        console.log(file.webdavuri);
        this.loadfromurl(file.webdavuri);
    }

    // given the contents of a PDB file, show the structure
    process(pdb) {
        var structure = pv.io.pdb(pdb);
        this.viewer.cartoon('protein', structure, { color : color.ssSuccession() });
        this.viewer.centerOn(structure);
    }

    loadlocalpdbfile() {
    }

    loadpdbfile() {
        var url = 'http://files.rcsb.org/view/' + this.pdbentry + '.pdb';
        //console.log('loadpdbfile()');
        this.loadfromurl(url)
    }

    loadfromurl(url) {
        this.httpclient.get(url)
            .then(data => {
              console.log("loadfromurl() OK");
              console.log(data.response);
                this.process(data.response);
            })
            .catch(error => {
              console.log("loadfromurl() error");
                console.log(error);
                alert('Sorry, response: '+error.statusCode+':'+error.statusText+' when trying to get: '+url);
            });
    }

     loadfromredo() {
       this.loadfromurl('http://www.cmbi.ru.nl/pdb_redo/'
    +this.pdbentry2.substring(1,3)+'/'
    +this.pdbentry2+'/'+this.pdbentry2+'_final.pdb')
}

}

