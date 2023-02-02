#!/bin/bash 

# generating the firebase json credentials for the server
# the envs for this are in the server
JSON_STRING="{
\"type\":\"${FIREBASE_ACCOUNT_TYPE}\",
\"project_id\":\"${FIREBASE_PROJECT_ID}\",
\"private_key_id\":\"${FIREBASE_PRIVATE_KEY_ID}\",
\"private_key\":\"${FIREBASE_PRIVATE_KEY}\",
\"client_email\":\"${FIREBASE_CLIENT_EMAIL}\",
\"client_id\":\"${FIREBASE_CLIENT_ID}\",
\"auth_uri\":\"${FIREBASE_AUTH_URI}\",
\"token_uri\":\"${FIREBASE_TOKEN_URI}\",
\"auth_provider_x509_cert_url\":\"${FIREBASE_TOKEN_URI}\",
\"client_x509_cert_url\":\"${FIREBASE_CLIENT_CERT_URL}\"
}"

echo $JSON_STRING > sylph-cert.json
echo "sylph-cert.json created!"
