'use strict';

const cryptoJs = require('crypto-js');
const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.checkLogin = (email, password) => {
  console.log('TODO: check user info');
  // TODO: Look up user by email (encrypted?), hash the password, & check equivalence.
};

module.exports.saveUser = (email, password) => {
  console.log('Creating user');

  const user = packageNewUserData(email, password);
  const userData = {
    TableName: process.env.USER_TABLE,
    Item: user,
  };

  return dynamoDb.put(userData).promise()
    .then(res => user);
};

const packageNewUserData = (email, password) => {
  const timestamp = new Date().getTime();
  const hash = cryptoJs.SHA256(password).toString(cryptoJs.enc.Base64);

  return {
    id: uuid.v1(),
    email: email,
    password: hash,
    submittedAt: timestamp,
    updatedAt: timestamp,
    lastLogin: timestamp,
  };
};
