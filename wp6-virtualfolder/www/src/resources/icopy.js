import {bindable} from 'aurelia-framework';
/** Icopy - <icopy href="link-reference"></icopy>
 * element to create a link icon which on click will copy the url into the clipboard
 * using the browser capability document.execCommand("copy")
 */

export class Icopy {
  @bindable href;

  attached() {
    //set value of referenced input
    // href is relative - thus adding protocol and hostname, port
    let port = (window.location.port == "" || window.location.port=="80" || window.location.port == "443")? "" :":"+window.location.port;
    this.hrefid.value = window.location.protocol+ '//'+window.location.hostname+port+this.href;
  }

  copyclipboard() {
    let inputElement = this.hrefid;
    inputElement.select();
    document.execCommand("copy");
    console.log(inputElement.value);
    alert("Copied the url to clipboard: " + inputElement.value);
  }
}
