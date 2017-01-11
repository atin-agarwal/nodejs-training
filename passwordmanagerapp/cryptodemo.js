var crypto = require('crypto-js');

var secretMessage = {
  name: 'facebook',
  secretName: '007'
};

var secretKey = '123abc';

//Encrpt
var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);
console.log("Encrpted Message : " + encryptedMessage);

//Decrypt
var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
var decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));

console.log("Decrypted Message : " + decryptedMessage.secretName);
