#!/usr/bin/env bash

function help {
echo Usage:
echo startJupyter.sh [username]|remove [port] [proxyurlpart]
echo   [username] is existing VF username with some mounted repositories and existing directory /home/vagrant/work/[username]
echo   remove indicates that proxy setting should be removed from apache
echo   [port] the jupyter service will listen in this port
echo   [proxyurlpart] the location, which will be reverse proxied to jupyter service
echo
echo   example:
echo   startJupyter.sh vagrant 8901
echo   startJupyter.sh remove 8901
}

function addapacheproxy {
  removeapacheproxy $2
  # hostname from the url in argument $1 is ${HOST[2]}, fix bug #24
  IFS="/";
  HOSTURL=( $1 )
  HOST=${HOSTURL[2]}
  echo $HOST
  IFS=" ";
  echo "<Location $2 >" | sudo -E tee -a $HTTPD_CONF
  echo "  RequestHeader set Host \"${HOST}\"" | sudo -E tee -a $HTTPD_CONF
  # on localhost, preservehost leads to ssl proxy error
  if [ $HOSTNAME = "localhost" ]; then
      echo "  #ProxyPreserveHost On" | sudo -E tee -a $HTTPD_CONF
  else
      echo "  ProxyPreserveHost On" | sudo -E tee -a $HTTPD_CONF
  fi
  echo "  ProxyPass \"$1/\"" | sudo -E tee -a $HTTPD_CONF
  echo "  ProxyPassReverse \"$1/\"" | sudo -E tee -a $HTTPD_CONF
  echo "</Location>" | sudo -E tee -a $HTTPD_CONF
  sudo service ${HTTPD_SERVICE} reload
}

function removeapacheproxy {
 echo removing apache proxy
 L1=`grep -n -m 1 "\<Location $1" $HTTPD_CONF | cut -f1 -d:`
 echo from row $L1
 if [ $L1 > 0 ]; then
   let L2=$L1+5
   echo to row $L2
   sudo sed -i "$L1,$L2 d" $HTTPD_CONF
 fi
}


if [ -z $1 ]; then
  echo missing username
  help
  exit 1
fi

if [-z $2 ]; then
  echo missing port
  help
  exit 1
fi

if [-z $3 ]; then
  echo missing proxyurlpart
  help
  exit 1
fi

WORKDIR=/home/vagrant/work/$1

if [ $1 == 'remove' ]; then
  removeapacheproxy $2
elif [ -d $WORKDIR ]; then
  cd $WORKDIR
  addapacheproxy http://localhost:$2 $3
  jupyter notebook --port $2 --no-browser
else
  echo Directory $WORKDIR does not exist.
  help
  exit 1
fi

exit