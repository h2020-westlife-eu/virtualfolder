#!/usr/bin/env bash

HTTPD_CONF="/etc/httpd/conf.d/000-default.conf"
HTTPD_SERVICE="httpd"

function help {
echo Usage:
echo startJupyter.sh [username] [port] [proxyurlpart] [log]
echo startJupyter.sh remove [username] [port] [proxyurlpart]
echo   remove indicates that proxy setting should be removed from apache, default is adding and starting the jupyter instance
echo   [username] is existing VF username with some mounted repositories and existing directory /home/vagrant/work/[username]
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
  WSURL="${1/http/ws}"
  echo $WSURL
  IFS="/:";
  HOSTURL=( $1 )
  HOST=${HOSTURL[2]}
  echo $HOST
  IFS=" ";
  echo "<Location $2 >" | sudo -E tee -a $HTTPD_CONF
  echo "  RequestHeader set Host \"${HOST}\"" | sudo -E tee -a $HTTPD_CONF
  # on localhost, preservehost leads to ssl proxy error
  if [ "$HOST" == "localhost" ]; then
      echo "  #ProxyPreserveHost On" | sudo -E tee -a $HTTPD_CONF
  else
      echo "  ProxyPreserveHost On" | sudo -E tee -a $HTTPD_CONF
  fi
  echo "  ProxyPass \"$1$2\"" | sudo -E tee -a $HTTPD_CONF
  echo "  ProxyPassReverse \"$1$2\"" | sudo -E tee -a $HTTPD_CONF
  echo "</Location>" | sudo -E tee -a $HTTPD_CONF
  echo "<LocationMatch \"$2/(user/[^/]*)/(api/kernels/[^/]+/channels|terminals/websocket)(.*)\">"| sudo -E tee -a $HTTPD_CONF
  echo "  ProxyPassMatch $WSURL$2/\$1/\$2\$3" | sudo -E tee -a $HTTPD_CONF
  echo "  ProxyPassReverse $WSURL$2/\$1/\$2\$3" | sudo -E tee -a $HTTPD_CONF
  echo "</LocationMatch>" | sudo -E tee -a $HTTPD_CONF
  sudo service ${HTTPD_SERVICE} reload
}

function removeapacheproxy {
 L1=`grep -n -m 1 "\<Location $1" $HTTPD_CONF | cut -f1 -d:`
 if [ $L1 > 0 ]; then
   echo removing apache proxy $1
   echo from row $L1
   let L2=$L1+9
   echo to row $L2
   sudo sed -i "$L1,$L2 d" $HTTPD_CONF
 fi
}

function killjupyter {
PIDS=`ps -af | grep "port $port" | cut -f4 -d" "`
echo killing jupyter processes $PIDS
kill $PIDS
}

if [ -z $1 ]; then
  echo missing username
  help
  exit 1
fi

if [ -z $2 ]; then
  echo missing port
  help
  exit 1
fi

if [ -z $3 ]; then
  echo missing proxyurlpart
  help
  exit 1
fi

WORKDIR=/home/vagrant/work/$1
echo startJupyter.sh called with args: $1:$2:$3:$4
if [ $1 == 'remove' ]; then
  killjupyter $3
  removeapacheproxy $4
elif [ -d $WORKDIR ]; then
  cd $WORKDIR
  addapacheproxy http://localhost:$2 $3
  if [ -z $4 ]; then
    echo launching jupyter without logs
    jupyter notebook --port $2 --no-browser &
  else
    echo launching jupyter log to $4
    jupyter notebook --port $2 --no-browser >$4 2>&1 &
  fi
else
  echo Directory $WORKDIR does not exist.
  help
  exit 1
fi

exit
