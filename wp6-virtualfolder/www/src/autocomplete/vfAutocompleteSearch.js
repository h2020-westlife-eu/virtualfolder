/**
 * Created by Tomas Kulhanek on 4/4/17.
 */


import {bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {computedFrom} from 'aurelia-framework';

export class VfAutocompleteSearch {
  @bindable value = ""; // value of input
  @bindable placeholder = "";
  @bindable submit;

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

  /*hides the suggestion by setting the binded property to false*/
  hideSuggestions() {
      this.showing=false;
  }

  /* check if blured to related element, then no hiding, otherwise hide*/
  blurSuggestions(evt) {
    if (evt.relatedTarget && evt.relatedTarget.className.startsWith('result-card-item')) return;
    this.hideSuggestions();
  }

  /* show the suggestions by setting the binded proparty to true*/
  showSuggestions() {
    this.showing=true;
  }

  /* reset the value in input field and shows */
  focusSuggestions() {
    this.value="";
    this.showSuggestions();
  }

  /**
   * Method to search via AJAX call for the suggestion items which will be shown
   */
  search(){
    let term = this.value;
    let config = this.config;
    let url = `${config.searchUrl}?${config.additionalParams}&${config.group}&fl=${config.fields}&sort=${config.sort}&group.limit=${config.groupLimit}&q=value:${term}*~10`
    return this.http
      .fetch(url)
      .then(response => response.json())
      .then(data => {
        //console.log("search response:")
        //console.log(data);
        this.resultGroups= data.grouped.category.groups
        //console.log(this.resultGroups);
      })
      .catch( err => {console.log('error search()');console.log(err)});
  }

  /* just compute if the results group is empty */
 @computedFrom('resultGroups')
 get resultGroupsEmpty() {
   return this.showing && this.resultGroups && this.resultGroups.length == 0;
 }

 /**
  * Method triggered when a key is pressed,
  * enter = submit, esc= hide suggestion
  * @param {event} DOM event holding key pressed */
 keypressed(evt){
   let key = evt.keyCode;
   if (key === 13) {
     /*may not be updated with input field as debounce has 750 ms this.submit({item:this.value});
      */
     this.submit({item: evt.originalTarget.value})
   } else
     if (key===27) this.hideSuggestions();

   return true;
 }

  /**
   * Method triggered when a suggestion item was clicked,
   * therefore taking it's value, submit and hide
   * @param {clickvalue} value which was clicked and will be submitted */
  clicked(clickvalue) {
    this.value = clickvalue;
    this.submit({item:clickvalue});
    this.hideSuggestions();
  }

  /**
   * Method triggered by AU when a value in input field is changed,
   * using debounce - it is triggered only after some delay (750ms) */
  valueChanged(newValue,oldValue){
    if (this.value && this.value.length>0) {
      this.search();

    }
  }

 /**
  * Method to search for more suggestions api call
  * @param {filter} a name of the group to be filtered
  */
  searchMore(filter) {
    let term = this.value;
      let fqVal = filter;
        let config=this.config;
    let url = `${config.searchUrl}?${config.additionalParams}&${config.group}&fl=${config.fields}&sort=${config.sort}&group.limit=-1&q=value:${term}*~10&fq=var_name:${fqVal}`
    return this.http
    //.get(`${this.pdbSolrUrl}&group.limit=-1&q=value:${term}*~10&fq=var_name:${fqVal}`)
      .fetch(url)
      .then(response => response.json())
      .then(data => {
        this.resultGroups= data.grouped.category.groups
      })
      .catch( err => {console.log('error searchMore()'); console.log(err);});
  }
}
