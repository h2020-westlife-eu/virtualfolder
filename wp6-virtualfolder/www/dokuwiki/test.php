<?php
/**
 * Created by IntelliJ IDEA.
 * User: ras23654
 * Date: 05/04/2016
 * Time: 15:25
 */
// Does not support flag GLOB_BRACE
function rglob($pattern, $flags = 0) {
    $files = glob($pattern, $flags);
    foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir) {
        $files = array_merge($files, rglob($dir.'/'.basename($pattern), $flags));
    }
    return $files;
}

echo "Test";

foreach (rglob("/home/vagrant/work/*.pdb") as $pdbfile) {
    echo $pdbfile;

}
?>

