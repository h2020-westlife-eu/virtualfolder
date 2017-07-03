/**
 * created by Tomas Kulhanek on 2/27/17.
 */

export class Sasclient {

  constructor(httpclient){
    this.client = httpclient;
    this.config = {
      resultBoxAlign: 'left',
      redirectOnClick: false,
      searchUrl: '//www.ebi.ac.uk/pdbe/search/pdb-autocomplete/select',
      fields: 'value,num_pdb_entries,var_name',
      group: 'group=true&group.field=category',
      groupLimit: '25',
      sort: 'category+asc,num_pdb_entries+desc',
      searchParams: 'rows=20000&json.nl=map&wt=json'
    }
  }

  search(term){
    //http://www.ebi.ac.uk/pdbe/search/pdb/select?fl=pdb_id,organism_synonyms,number_of_bound_entities,+number_of_protein_chains,experimental_method,+experiment_data_available,expression_host_sci_name,+citation_year,+entry_organism_scientific_name,number_of_RNA_chains,number_of_DNA_chains,sample_preparation_method,emdb_id&group=true&group.field=pdb_id&group.limit=100&rows=1000&wt=json&q=pdb_id:(1cbs)
    //http://www.ebi.ac.uk/pdbe/search/pdb-autocomplete/select?rows=20000&json.nl=map&wt=json&group=true&group.field=category&fl=value,num_pdb_entries,var_name&sort=category+asc,num_pdb_entries+desc&group.limit=25&q=value:2hh*~10
    //http://www.ebi.ac.uk/pdbe/search/pdb-autocomplete/select?rows=20000&json.nl=map&wt=json&fl=value,num_pdb_entries,var_name&group=true&group.field=category&sort=category+asc,num_pdb_entries+desc&group.limit=25&q=value:2hh*~10
    let url = this.config.searchUrl+"?"+this.config.searchParams+"&fl="+this.config.fields+ "&"+this.config.group+"&sort="+this.config.sort+"&group.limit="+this.config.groupLimit+"&q=value:"+term+"*~10";

    this.client.get(url)
      .then(data => {
        if (data.response) {

          return data.response.grouped.category.groups
        }
      }).catch(error => {

      console.log('Error');
      console.log(error);
    });
  }

  searchMore(term) {

  }

}
