#!/usr/bin/env bash
#postProvstore.sh [base64 encoded json content to sent] [username] [apikey]
echo $1|base64 -d >/tmp/myfile.json
#echo curl -d @/tmp/myfile.json -H \"Content-Type: text/provenance-notation\" -H \"Authorization: ApiKey $2:$3\" -X POST https://openprovenance.org/store/api/v0/documents/
curl -d @/tmp/myfile.json -H "Content-Type: text/provenance-notation" -H "Authorization: ApiKey $2:$3" -X POST https://openprovenance.org/store/api/v0/documents/
rm /tmp/myfile.json
