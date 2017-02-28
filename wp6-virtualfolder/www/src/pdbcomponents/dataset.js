/**
 * Created by Tomas Kulhanek on 2/21/17.
 */
/*
 <script type="text/javascript" src="/scripts/autocomplete/build/inline.bundle.js"></script>
 <script type="text/javascript" src="/scripts/autocomplete/build/vendor.bundle.js"></script>
 <script type="text/javascript" src="/scripts/autocomplete/build/main.bundle.js"></script>
 */

//import "autocomplete";


//Model view controller
//Model view viewmodel

export class Dataset {
  constructor () {
    this.pdbdataset = [];
    this.pdbdataitem = "";
  }

  /*bootstrapPdbeAutocomplete(){
    console.log("pdb-autocomplete bootstrap()");
    var event;
    if (typeof MouseEvent == 'function') {
      event = new MouseEvent('PDBeWebComponentsReady', { 'view': window, 'bubbles': true, 'cancelable': true });
    } else if (typeof document.createEvent == 'function') {
      event = document.createEvent('MouseEvents');
      event.initEvent('PDBeWebComponentsReady', true, true );
    }
    //Dispatch
    document.dispatchEvent(event);
  }

  attached() {
    console.log("Dataset attached(), calling bootstrap.")
    var PdbeAutocompleteSearchConfig = {
      resultBoxAlign: 'left',
      redirectOnClick: false,
      searchUrl: '//www.ebi.ac.uk/pdbe/search/pdb-autocomplete/select',
      fields: 'value,num_pdb_entries,var_name',
      group: 'group=true&group.field=category',
      groupLimit: '25',
      sort: 'category+asc,num_pdb_entries+desc',
      searchParams: 'rows=20000&json.nl=map&wt=json'
    }
    document.addEventListener('PDBe.autocomplete.click', function(e){ console.log(e.eventData) })

    this.bootstrapPdbeAutocomplete();
  }
*/
  additem(){
    this.pdbdataset.push(this.pdbdataitem);
  }
}
