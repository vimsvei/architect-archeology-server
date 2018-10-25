#!/bin/bas
CT="Content-Type:application/json"

DATA='{
"company":{"name":"Буревестник","fullName":"ООО Буревестник","code":"BRVST","site":"http://буревестник.рф"},
"user":{"firstName": "Андрей", "lastName": "Головотяпов", "email":"andrew@gmail.com", "password":"asdfgUI!$"}
}'
REQUEST="curl -X POST http://localhost:51081/signup -H $CT -d '$DATA'"
echo $REQUEST
RESPONSE=`$REQUEST`
echo $RESPONSE

#DATA = '{"login":"andrew@gmail.com","password":"asdfgUI!$"}'
#REQUEST = "curl -X POST http://localhost:51081/auth -H $CT -d $DATA"
#echo $REQUEST
#RESPONSE=`$REQUEST`
#echo $RESPONSE
