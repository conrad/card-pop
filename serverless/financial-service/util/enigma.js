const bcrypt = require('bcrypt');
const creds = ('credentials/hashing.js');
const AWS = require('aws-sdk');
const cryptoJS = require("crypto-js");

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.encrypt = data => {
  if (typeof data !== 'string') {
    return 'Cannot encrypt non-string';
  }

  return cryptoJS.AES.encrypt(data, creds.encSecret);
};


module.exports.decrypt = encryptedData => {
  if (typeof encryptedData !== 'string') {
    return 'Cannot decrypt non-string';
  }

  const bytes = cryptoJS.AES.decrypt(encryptedData.toString(), creds.encSecret);

  return bytes.toString(CryptoJS.enc.Utf8);
};

/// hash data using a salt
/// @param {String} password the data to encrypt
/// @return {String} hash
module.exports.store = password => {
  bcrypt.genSalt(creds.saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
    });
  });
};

/// compare raw data to hash
/// @param {String} data the data to hash and compare
/// @param {String} hash expected hash
/// @return {bool} true if hashed data matches hash
module.exports.checkPassword = (email, password) => {
  // Load hash from your password DB.
  const hash = dynamoDb.get()

  bcrypt.compare(password, hash, function(err, res) {
      // res == true
      if (err) {
        console.error('Error trying to check password.');
      }

      return res;
  });
};
