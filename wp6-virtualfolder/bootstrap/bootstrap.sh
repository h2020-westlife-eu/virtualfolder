#!/usr/bin/env bash
# expect WP6SRC is set
if [ -z $WP6SRC ]; then
  echo Setting WP6SRC
  export WP6SRC=`pwd`
fi
if [ -z $VREDIR ]; then
  echo Setting VREDIR
  export VREDIR=/opt/vre
fi

$WP6SRC/bootstrap/bootstrapcvmfswestlife.sh
$WP6SRC/bootstrap/bootstrapweb.sh
$WP6SRC/bootstrap/bootstrapvre.sh
$WP6SRC/bootstrap/bootstrapservice.sh
$WP6SRC/bootstrap/bootstrapscipion.sh
$WP6SRC/bootstrap/bootstrapvirtuoso.sh
if [[ -n ${ALLOW_JUPYTER} && ${ALLOW_JUPYTER} -eq "1" ]]; then $WP6SRC/bootstrap/bootstrapjupyter.sh
$WP6SRC/bootstrap/bootstrapstart.sh
if curl -I http://localhost
then
  echo "BOOTSTRAP FINISHED, VM prepared to use\n guest url: http://localhost\n host url: http://localhost:8080"
else
  echo "BOOTSTRAP FAILED, check logs, repair manually or try again."
fi
