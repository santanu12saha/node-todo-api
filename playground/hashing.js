const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var info = {
    id: 10
};

var token = jwt.sign(info, '123abc');
console.log(`Token ${token}`);

var decoded = jwt.verify(token, '123abc');
console.log(`Decoded ${JSON.stringify(decoded, null, 2)}`);

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
if(resultHash == token.hash) {
    console.log('Data was not changed');
}else {
    console.log('Data was changed. Do not trust!');
}
