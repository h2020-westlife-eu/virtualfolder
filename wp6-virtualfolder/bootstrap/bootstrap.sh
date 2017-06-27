#!/usr/bin/env bash
# expect WP6SRC is set
$WP6SRC/bootstrap/bootstrapweb.sh
$WP6SRC/bootstrap/bootstrapvre.sh
$WP6SRC/bootstrap/bootstrapservice.sh
$WP6SRC/bootstrap/bootstrapscipion.sh
$WP6SRC/bootstrap/bootstrapvirtuoso.sh
$WP6SRC/bootstrap/bootstrapstart.sh
echo "BOOTSTRAP FINISHED, VM prepared to use"