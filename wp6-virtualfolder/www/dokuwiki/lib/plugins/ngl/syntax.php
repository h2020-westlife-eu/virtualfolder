<?php
/**
  * NGL-Plugin: Parses ngl block
  *
  * @license  GPL 2 (http://www.gnu.org/licenses/gpl.html)
  * @author  Tomas Kulhanek
  * @version  1.0
  */
if(!defined('DOKU_INC')) define('DOKU_INC',realpath(dirname(__FILE__).'/../../').'/');
  require_once(DOKU_INC.'inc/init.php');
if(!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN',DOKU_INC.'lib/plugins/');
  require_once(DOKU_PLUGIN.'syntax.php');

// recursive glob()
function rglob($pattern, $flags = 0) {
  $files = glob($pattern, $flags);
  foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir) {
    $files = array_merge($files, rglob($dir.'/'.basename($pattern), $flags));
  }
  return $files;
}

class syntax_plugin_ngl extends DokuWiki_Syntax_Plugin {
  var $nglDir = '';
  var $nglJS  = '';
//  var $pdbdir = '';

  // Constructor
  function syntax_plugin_ngl(){
    $sl = (substr(DOKU_BASE,-1)!='/')?'/':'';
    $this->nglDir = DOKU_BASE.$sl.'lib/plugins/ngl';
    $this->nglJS  = $this->jmolDir.'ngl.js';
  }
  function getInfo(){
    return array(
     'author' => 'Tomas Kulhanek',
     'email'  => 'tomas.kulhanek@matfyz.cz',
     'date'   => '2016-03-31',
     'name'   => 'Ngl Plugin',
     'desc'   => 'Parses ngl-blocks
                  <ngl>... script ...</ngl>',
     'url'  => 'http://github.com/TomasKulhanek/ngl',);
  }

  function getType(){  return 'protected';  }
  function getSort(){  return 815;  }
  function connectTo($mode){
    $this->Lexer->addEntryPattern('<ngl.*?>(?=.*?</ngl>)',$mode,'plugin_ngl');
  }
  function postConnect(){
    $this->Lexer->addExitPattern('</ngl>','plugin_ngl');
  }

  // Handling lexer
  function handle($match, $state, $pos) {
    switch ($state){
      case DOKU_LEXER_ENTER :
        list($pdbname,$width,$height,$background) = explode(" ", substr($match, 2+4, -1));
        return array($state, array($pdbname,$width,$height,$background));
      case DOKU_LEXER_UNMATCHED :
        return array($state, $match);
      case DOKU_LEXER_EXIT :
        return array($state, '');
    }
    return array();
  }


  /**
  * Render Jmol applet
  */
  function render($mode, &$renderer, $data)
  {
    if ($mode != 'xhtml')
      return false;
    global $conf;
    @list($state, $match) = $data;
    switch ($state) {
      case DOKU_LEXER_ENTER:
        $renderer->doc .= <<<EOT
        <button onclick='stage.removeAllComponents();stage.loadFile("rcsb://1dtx").then( function( o ){o.addRepresentation( "cartoon" ); o.addRepresentation( "licorice" ); o.centerView(); } );'>1dtx</button>
EOT;
      foreach(rglob("/home/vagrant/work/mydata/*.pdb") as $pdbfile) {
        $pdbfile2 = "/webdav/mydata".substr($pdbfile, 25); //20 is length of /home/vagrant/work to be stripped
        $renderer->doc .= <<<EOT
        <button onclick='stage.removeAllComponents();stage.loadFile("$pdbfile2").then( function( o ){o.addRepresentation( "cartoon" ); o.addRepresentation( "licorice" ); o.centerView(); } );'>$pdbfile2</button>
EOT;
      }
        foreach(rglob("/home/vagrant/work/mydata/*.mtz") as $pdbfile){
          $pdbfile2 = "/webdav/mydata".substr($pdbfile,25); //20 is length of /home/vagrant/work/mydata to be stripped
          $renderer->doc.=<<<EOT
        <button onclick='stage.removeAllComponents();stage.loadFile("$pdbfile2").then( function( o ){o.addRepresentation( "cartoon" ); o.addRepresentation( "licorice" ); o.centerView(); } );'>$pdbfile2</button>
EOT;

      }
      $renderer->doc .= <<<EOT
        <script src="$this->nglDir/js/build/ngl.full.min.js"></script>

        <script>

            if( !Detector.webgl ) Detector.addGetWebGLMessage();
            var stage;
            function onInit(){
                stage = new NGL.Stage( "viewport" );
                stage.loadFile( "rcsb://1crn" ).then( function( o ){
                    o.addRepresentation( "cartoon" );
                    o.addRepresentation( "licorice" );
                    o.centerView();
                } );
            }

            document.addEventListener( "DOMContentLoaded", function() {
                NGL.init( onInit );
            } );

        </script>

        <script src="$this->nglDir/js/tracking.js"></script>
        <div id="viewport" style="width:1600px; height:800px;"></div>

EOT;
            break;
  }
/*<div id="viewport" style="width:500px; height:500px;"></div>*/
   }
}
?>