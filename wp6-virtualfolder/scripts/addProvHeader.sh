#!/usr/bin/env bash

HTTPD_CONF="/etc/httpd/conf.d/dataset.conf"
HTTPD_SERVICE="httpd"

function help {
cat<< EOF
Usage:
addProvHeader.sh [add|remove] <dataset-name> <dataset-link>
     add - will create rule to append Header Link: to <dataset-name> for (webdav/user) and (api/files) request
     remove - will remove existing rule for <dataset-name>
EOF
}

function addrule {
  echo adding rule $1 $2 $3
  # if it already exist - remove first
  removerule $1 $2
  cat <<EOF | sudo -E tee -a $HTTPD_CONF
<LocationMatch /(webdav/$1|api/files)/$2>
  Header append Link "<$3>; rel=\"http://www.w3.org/ns/prov#has_provenance\"; anchor=\"target-URI\""
</LocationMatch>
EOF
  sudo service ${HTTPD_SERVICE} reload
}

function removerule {
  echo removing rule $1 $2
  L1=`grep -n -m 1 "\<LocationMatch /(webdav/$1|api/files)$2\>" $HTTPD_CONF | cut -f1 -d:`
  if [ $L1 > 0 ]; then
    echo removing apache proxy $1
    echo from row $L1
    let L2=$L1+3
    echo to row $L2
    sudo sed -i "$L1,$L2 d" $HTTPD_CONF
  fi
  sudo service ${HTTPD_SERVICE} reload
}


# Main program
if [ -z $2 ]; then
  echo missing \<dataset-name\> argument
  help
  exit 1
fi
d=$2
username=${d%%/*}
datasetfile=${d#*/}  

if [ $1 == 'add' ]; then
  if [ -z $3 ]; then
    echo missing \<dataset-link\> argument
    help
    exit 1
  fi
  addrule $username $datasetfile $3
  exit 0;
fi

if [ $1 == 'remove' ]; then
  removerule $username $datasetfile
  exit 0;
fi

help