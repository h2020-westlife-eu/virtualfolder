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

      if (this.bindingContext.viewpanel2) {
        this.bindingContext.childview2 = this;
        this.viewerdom = $('.fileviewer')[0]; //was[1] if.bind removes from DOM
          console.log(this.viewerdom);
      }
      if (this.bindingContext.viewpanel1) {
        this.bindingContext.childview = this;
        this.viewerdom = $(".fileviewer")[0];
          console.log(this.viewerdom);
      }
      if (this.bindingContext.fileurl) this.fileurl = this.bindingContext.fileurl;
        console.log(this.fileurl);
      var options = {
        width: 'auto',
        height: 'auto',
        antialias: true,
        quality : 'medium'
        // background='black', outlineColor='white'
      };
      // insert the viewer under the Dom element with id 'gl'.
        console.log(this);
        console.log(this.viewer);
        if (!this.viewer)
            this.viewer = pv.Viewer(this.viewerdom, options);
            if (this.fileurl) this.viewfile();
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

    viewfile(fileurl) {
        if (fileurl) this.fileurl = fileurl;
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
                alert('Sorry, response: '+error.statusCode+':'+error.statusText+' when trying to get: '+url);
            });
    }

     loadfromredo() {
       this.loadfromurl('http://www.cmbi.ru.nl/pdb_redo/'
    +this.pdbentry2.substring(1,3)+'/'
    +this.pdbentry2+'/'+this.pdbentry2+'_final.pdb')
}

}

