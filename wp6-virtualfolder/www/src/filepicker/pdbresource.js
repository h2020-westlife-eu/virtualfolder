/**
 * Created by vagrant on 9/12/17.
 */
export class Pdbresource {

  constructor() {
  }

  select(resource){
    let resources = [];
    resources.push({name:"..",info:"UP-DIR",id: resource.id});
    if (resource.name=="PDB") // root
    {
      for (var i=1;i<10;i++) {
        resources.push({name:i+"*", info:"pdb entries begining with '"+i+"'", id: resource.id});
      }
    } else {
      if (resource.name.endsWith("*")) {
        let prefix =resource.name.slice(0,-1);
        for (var i=0;i<=9;i++)
          resources.push({name: prefix + i + "*", info: "", id: resource.id})
        for (var i='a'.charCodeAt(0);i<='z'.charCodeAt(0);i++) {
          resources.push({name: prefix + String.fromCharCode(i) + "*", info: "", id: resource.id});
        }
      }
    }
    return resources;
  }
}

