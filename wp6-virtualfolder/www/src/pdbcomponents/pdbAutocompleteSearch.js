/**
 * Created by Tomas Kulhanek on 2/27/17.
 */

import {bindable} from 'aurelia-framework';

export class PdbAutocompleteSearch {
  static inject = [Element];

  constructor(element) {
    this.element = element;
  }

  //triggered when the element is attached to DOM
  attached(){
  console.log("pdb autocomplete");
    console.log(this.element);
    //Autocomplete Config Object
    this.PdbeAutocompleteSearchConfig = {
      resultBoxAlign: 'left',
      redirectOnClick: false,
      searchUrl: '//www.ebi.ac.uk/pdbe/search/pdb-autocomplete/select',
      fields: 'value,num_pdb_entries,var_name',
      group: 'group=true&group.field=category',
      groupLimit: '25',
      sort: 'category+asc,num_pdb_entries+desc',
      searchParams: 'rows=20000&json.nl=map&wt=json',
      longStackTraces: true
    }

    //
    document.addEventListener('PDBe.autocomplete.click', function(e){ console.log(e.eventData) });

    //Method to manually boostrap PDBe autocomplete by dispatching custom event 'PDBeWebComponentsReady'
      var event;
      if (typeof MouseEvent == 'function') {
        event = new MouseEvent('PDBeWebComponentsReady', { 'view': window, 'bubbles': true, 'cancelable': true });
      } else if (typeof document.createEvent == 'function') {
        event = document.createEvent('MouseEvents');
        event.initEvent('PDBeWebComponentsReady', true, true ); //buubles, canceable
      }
      //Dispatch
      document.dispatchEvent(event);
    angular.bootstrap(this.element.parentNode);

    }
}
