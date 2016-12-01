/**
 * Created by Tomas Kulhanek on 11/29/16.
 */

import {HttpClient} from 'aurelia-http-client';

let client = new HttpClient();

export class  Viewpanel {
    constructor() {
      this.fileurl="";
    }

    attached(){
        console.log('viewpanel.attached()')
        console.log(this);
      if (this.bindingContext.childview) {
        this.bindingContext.childview2 = this;
        this.viewer = $('.fileviewer')[1];
      } else {
        this.bindingContext.childview = this;
        this.viewer = $(".fileviewer")[0];
      }
      var options = {
        width: 600,
        height: 600,
        antialias: true,
        quality : 'medium'
        // background='black', outlineColor='white'
      };
      // insert the viewer under the Dom element with id 'gl'.

      console.log(this.viewer);
      //console.log(document.getElementById('viewer'));
      this.viewer = pv.Viewer(this.viewer, options);
        }

// override the default options with something less restrictive.
    bind(bindingContext,overrideContext) {
      //this.filetoview = this.fileurl;
      console.log("bind(). fileurl:");
      console.log(this.fileurl);
      console.log(this.viewid);
      console.log(bindingContext);
      console.log(overrideContext);
      this.bindingContext = bindingContext;
      //TODO ugly tight coupling -adding refs to itself to parent

    }

    viewfile(fileurl){
      this.fileurl = fileurl;
      console.log("viewFile(). fileurl:");
      console.log(this.fileurl);
      if (this.fileurl && this.fileurl.endsWith('pdb')) {
        this.loadfromurl(this.fileurl);
        //loadlocalpdbfile();
      }
    }

    created(owningView,myview) {
        this.parent = owningView;//.controller.viewModel;
//        console.log('viewpanel.created');
//        console.log(this.parent);
        //
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
        client.get(url)
            .then(data => {
    //            console.log('loadpdbfile()');
      //          console.log(data);
                this.process(data.response);
            })
            .catch(error => {
                console.log(error);
                alert('Sorry, response: '+error.message+' when trying to get: '+url);
            });
    }

     loadfromredo() {
       this.loadfromurl('http://www.cmbi.ru.nl/pdb_redo/'
    +this.pdbentry2.substring(1,3)+'/'
    +this.pdbentry2+'/'+this.pdbentry2+'_final.pdb')
}

}

