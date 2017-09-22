LOGIN_URL=http://localhost/accounts/login/
YOUR_USER='vagrant'
YOUR_PASS='vagrant'
COOKIES=cookies.txt
CURL_BIN="curl -s -c $COOKIES -b $COOKIES -e $LOGIN_URL"

echo -n "Django Auth: get csrftoken ..."
$CURL_BIN $LOGIN_URL > /dev/null
DJANGO_TOKEN="csrfmiddlewaretoken=$(grep csrftoken $COOKIES | sed 's/^.*csrftoken\s*//')"

echo -n " perform login ..."
$CURL_BIN \
    -d "$DJANGO_TOKEN&username=$YOUR_USER&password=$YOUR_PASS" \
    -X POST $LOGIN_URL

echo -n " do something while logged in ..." 
$CURL_BIN \
    -X PUT 'http://localhost/metadataservice/json/reply/ProviderItem' -H "Content-Type: application/json" --data '{"alias":"vagrant","type":"FileSystem","securetoken":"/vagrant","loggeduser":"vagrant"}'

echo " logout"
rm $COOKIES
#curl --user vagrant:vagrant --cookie-jar --request POST ./vagrantcookie http://localhost/accounts/login
#curl --cookie ./vagrantcookie --request PUT 'http://localhost/metadataservice/json/reply/ProviderItem' --data '{"alias":"vagrant","type":"FileSystem","securetoken":"/vagrant","loggeduser":"vagrant"}'
