if [ -z ${WP6SRC} ]; then
  # gets absolute path of the parent of current directory
  WP6SRC=`readlink -f ..`
fi

if hash npm 2>/dev/null; then
  echo using npm
else
  echo Installing npm
  yum -y install npm
fi
  
if hash au 2>/dev/null; then
  echo using preinstaled aurelia-cli
else
  echo Installing aurelia-cli
  npm install aurelia-cli -g
fi
MYCD=`pwd`
cd $WP6SRC/www
chown -R vagrant:vagrant $WP6SRC
echo Installing npm dependencies
sudo -u vagrant npm install
echo Building
au build 
cd $MYCD
