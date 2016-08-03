<?php
/**
 * Action sendemail for DokuWiki plugin bureaucracy
 * 24.05.2016 tomas - fix bug of space at the end, added check of nonnull length of params before writing secrets
 */

class helper_plugin_bureaucracy_actionconnect extends helper_plugin_bureaucracy_action {

    protected $b2drop_address = '/home/vagrant/work/b2drop';
    protected $b2drop_oc_folder = '/home/vagrant/b2drop';
    protected $b2drop_oc_url = 'https://b2drop.eudat.eu';

    protected $filename = '/tmp/secrets'; //secret file for davfs
    protected $filename_oc = '/tmp/secrets_oc'; //secret file for owncloud
    protected $cmd= 'sudo /home/vagrant/scripts/mountb2drop.sh'; //custom script to mount davfs and start owncloud sync
    /**
     * Set a new B2DROP connection from the submitted data and write it to the file
     *
     * @param helper_plugin_bureaucracy_field[] $fields
     * @param string                            $thanks
     * @param array                             $argv
     * @return string thanks message
     * @throws Exception mailing failed
     */

    function tailShell($filepath, $lines = 1) {
        ob_start();
        passthru('sudo tail -'  . $lines . ' ' . escapeshellarg($filepath));
        return trim(ob_get_clean());
    }

    public function run($fields, $thanks, $argv) {
        global $ID;
        global $conf;

        $text = "";
        $text .= $this->b2drop_address;
        $textoc = "";
        $index = 0;
        //adds each field into the
        foreach($fields as $field) {
            $value = $field->getParam('value');
            $label = $field->getParam('label');
            if (strlen($value)>0) $text .= " ";
            $text .= trim($value);
            if ($index == 1) {
              $textoc .= "-u $value"; //first is username
            } elseif ($index == 2) {
              $textoc .= " -p $value"; //second is password
            } else {
              $textoc .= " $value"; //others may be dir and url
            }
            $index++;
        }
        $textoc .= " $this->b2drop_oc_folder $this->b2drop_oc_url";

        $secretfile = fopen($this->filename,"w") or die ("Unable to open file  $this->filename !");
        //error_log('debug secrets: "'.$text.'"');
        fwrite($secretfile, $text);
        fclose($secretfile);

        $secretfile = fopen($this->filename_oc,"w") or die ("Unable to open file  $this->filename_oc !");
        fwrite($secretfile, $textoc);
        fclose($secretfile);

        exec($this->cmd);
        //check whether something is in work dir
        $files    = scandir($this->b2drop_address);
        error_log("files in ".$this->b2drop_address." :".count($files));
        if (count($files)<=2) {
            $log=$this->tailShell("/var/log/apache2/error.log",3);
            return "$thanks. Something wrong happened, could not connect b2drop. Log: ".$log;
        }
        return "$thanks OK";
    }

}
// vim:ts=4:sw=4:et:enc=utf-8:
