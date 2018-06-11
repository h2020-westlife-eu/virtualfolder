LOGIN_URL=http://localhost/accounts/login/
YOUR_USER='vagrant'
YOUR_PASS='vagrant'
COOKIES=cookies.txt
CURL_BIN="curl -s -c $COOKIES -b $COOKIES -e $LOGIN_URL"

if [[ -n ${PORTAL_DEPLOYMENT} && ${PORTAL_DEPLOYMENT} -eq "1" ]]; then
  echo -n "Adding default filesystem provider. Getting csrftoken ..."
  $CURL_BIN $LOGIN_URL > /dev/null
  DJANGO_TOKEN="csrfmiddlewaretoken=$(grep csrftoken $COOKIES | sed 's/^.*csrftoken\s*//')"

  echo -n " perform login ..."
$CURL_BIN \
    -d "$DJANGO_TOKEN&username=$YOUR_USER&password=$YOUR_PASS" \
    -X POST $LOGIN_URL
fi
echo -n "Waiting until metadataservice endpoint is available "
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost/metadataservice/metadata)" != "200" ]]; do sleep 5; echo -n "." done
echo -e "\nRegistering filesystem provider"
if [ -d /vagrant ]; then 
$CURL_BIN \
    -X PUT 'http://localhost/metadataservice/json/reply/ProviderItem' -H "Content-Type: application/json" --data '{"alias":"vagrant","type":"FileSystem","securetoken":"/vagrant","loggeduser":"vagrant"}'
fi    
if [ -d /vagrant_data ]; then 
$CURL_BIN \
    -X PUT 'http://localhost/metadataservice/json/reply/ProviderItem' -H "Content-Type: application/json" --data '{"alias":"vagrant_data","type":"FileSystem","securetoken":"/vagrant_data","loggeduser":"vagrant"}'
fi

echo " logout"
rm $COOKIES
#curl --user vagrant:vagrant --cookie-jar --request POST ./vagrantcookie http://localhost/accounts/login
#curl --cookie ./vagrantcookie --request PUT 'http://localhost/metadataservice/json/reply/ProviderItem' --data '{"alias":"vagrant","type":"FileSystem","securetoken":"/vagrant","loggeduser":"vagrant"}'
