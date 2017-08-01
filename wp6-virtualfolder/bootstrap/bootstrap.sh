#!/usr/bin/env bash
# expect WP6SRC is set
$WP6SRC/bootstrap/bootstrapweb.sh
$WP6SRC/bootstrap/bootstrapvre.sh
$WP6SRC/bootstrap/bootstrapservice.sh
$WP6SRC/bootstrap/bootstrapscipion.sh
$WP6SRC/bootstrap/bootstrapvirtuoso.sh
$WP6SRC/bootstrap/bootstrapjupyter.sh
$WP6SRC/bootstrap/bootstrapstart.sh
if curl -I http://localhost
then
  echo "BOOTSTRAP FINISHED, VM prepared to use at http://localhost (from host http://localhost:8080)"
else
  echo "BOOTSTRAP FAILED, check logs, repair manually or try again."
fi
