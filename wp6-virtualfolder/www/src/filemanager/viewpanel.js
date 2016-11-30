/**
 * Created by Tomas Kulhanek on 11/29/16.
 */

import {HttpClient} from 'aurelia-http-client';

let client = new HttpClient();

export class Viewpanel {
    constructor() {
        this.filetoview = '';
    }

    attached(){
        console.log('viewpanel.attached()')
        var options = {
            width: 600,
            height: 600,
            antialias: true,
            quality : 'medium'
            // background='black', outlineColor='white'
        };
        // insert the viewer under the Dom element with id 'gl'.

        //console.log($('#viewer')[0]);
        //console.log(document.getElementById('viewer'));
        this.viewer = pv.Viewer($('#viewer')[0], options);

        this.filetoview = this.parent.bindingContext.fileurl;
        //this.filetoview = this.fileurl;
  //      console.log(this.filetoview);

        if (this.filetoview && this.filetoview.endsWith('pdb')) {
            this.loadfromurl(this.filetoview);
            //loadlocalpdbfile();
        }
// override the default options with something less restrictive.
    }

    detached(){
        console.log('viewpanel.detached()');

        this.viewer = null;
        $('#viewer').empty();
        $('#viewer').remove();
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
                alert('Sorry, response: '+error+' when trying to get: '+url);
            });
    }

}
