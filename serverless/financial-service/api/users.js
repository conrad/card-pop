'use strict';

const cryptoJs = require('crypto-js');
const uuid = require('uuid');
const AWS = require('aws-sdk');
const usersDb = require('../data/usersDb.js')

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.login = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  const email = requestBody.email;
  const password = requestBody.password;

  if (typeof email !== 'string' || typeof password !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create user because of validation errors.'));
    return;
  }

  usersDb.checkLogin(email, password)
    .then(res => {
      // Create session & send session access token

    })
    .catch(err => {

    });


  });


};


module.exports.create = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  if (requestBody == null) {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create user because of validation errors.'));
    return;
  }

  const email = requestBody.email;
  const password = requestBody.password;

  if (typeof email !== 'string' || typeof password !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create user because of validation errors.'));
    return;
  }

  // TODO: enable real encryption - no "real" passwords in the meantime.
  usersDb.create(email, password))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully created user with email ${email}`,
          userId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(new Error(`Unable to create user with email ${email}`))
      // callback(null, {
      //   statusCode: 500,
      //   body: JSON.stringify({
      //     message: `Unable to create user with email ${email}`
      //   })
      // })
    });
};
