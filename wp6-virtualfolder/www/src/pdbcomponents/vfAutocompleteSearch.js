/**
 * Created by Tomas Kulhanek on 4/4/17.
 */


import {bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {computedFrom} from 'aurelia-framework';

export class VfAutocompleteSearch {
  @bindable value = ""; // value of input
  @bindable placeholder = "";

  static inject = [HttpClient];

  constructor(httpclient) {
    this.http = httpclient;
    this.config = {
      resultBoxAlign: 'left',
      redirectOnClick: false,
      searchUrl: '//www.ebi.ac.uk/pdbe/search/pdb-autocomplete/select',
      fields: 'value,num_pdb_entries,var_name',
      group: 'group=true&group.field=category',
      groupLimit: '25',
      sort: 'category+asc,num_pdb_entries+desc',
      additionalParams: 'rows=20000&json.nl=map&wt=json'
    }
  }

  hideSuggestions() {
    this.showing=false;
  }

  showSuggestions() {
    this.showing=true;
  }

  attached(){

  }

  search(term, config){
    let url = `${config.searchUrl}?${config.additionalParams}&${config.group}&fl=${config.fields}&sort=${config.sort}&group.limit=${config.groupLimit}&q=value:${term}*~10`
    return this.http
      .fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("search response:")
        console.log(data);
        this.resultGroups= data.grouped.category.groups
        console.log(this.resultGroups);
      })
      .catch( err => console.log('error'));
  }

 /*@computedFrom('resultGroups')
 get resultGroupsEmpty() {
   return this.resultGroups.length == 0;
 }*/

  keyPressed(evt) {
    let key = evt.keyCode;
    //logger.debug(`Key pressed ${key}`);
    if (this._suggestionsShown) {
      switch (key) {
        case 13: // Enter
          if (this._selected !== null) this.select(this._selected)
          break;
        case 40: // Down
          this._selected++;
          if (this._selected >= this._suggestions.length) this._selected = this._suggestions.length - 1;
          this.makeVisible(this._selected);
          break;
        case 38: // Up
          this._selected--;
          if (this._selected < 0) this._selected = 0;
          this.makeVisible(this._selected);
          break;
        case 27: // Escape
          this.hideSuggestions();
          break;
      }
    } else {
      if (key === 13)
        if (this.immediateValue && this.immediateValue !== this.value) {
          //enable enter for fast typing - before delayed value changes
          this.fireSelectedEvent(this.immediateValue);

        } else if (this.value) {
          this.fireSelectedEvent(this.value, this.selectedValue);
        }
    }
    this.showSuggestions();
    return true;
  }

  valueChanged(newValue,oldValue){
    console.log("valuechanged()");
    if (this.value && this.value.length>0) {
      this.search(this.value, this.config);

    }
  }

  searchMore(term, fqVal, config) {
    let url = `${config.searchUrl}?${config.additionalParams}&${config.group}&fl=${config.fields}&sort=${config.sort}&group.limit=-1&q=value:${term}*~10&fq=var_name:${fqVal}`
    return this.http
    //.get(`${this.pdbSolrUrl}&group.limit=-1&q=value:${term}*~10&fq=var_name:${fqVal}`)
      .get(url)
      .toPromise()
      .then(response => {
        return response.json().grouped.category.groups
      })
      .catch( err => console.log('error'));
  }

}
