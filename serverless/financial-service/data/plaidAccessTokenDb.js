// const uuid = require('uuid');
const AWS = require('aws-sdk');
const enigma = require('../util/enigma');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.put = (userId, itemId, accessToken, callback) => {
  console.log('storing access token');
  const rowData = {
    user_id: userId,
    item_id: itemId,
    access_token: accessToken
  };

  const accessTokenTblData = {
    TableName: process.env.ACCESS_TOKEN_TABLE,
    Item: enigma.encrypt(JSON.stringify(rowData))
  };

  return dynamoDb.put(accessTokenTblData).promise()
  .then(res => {
    callback(null, res);
  })
  .catch(err => {
    callback(err)
  });
};

module.exports.get = (userId, itemId) => {
  console.log('We should do something here...')
  // Look into dynameDb documentation for this query:
  // return enigma.decrypt(
  //   dynamoDb.get({
  //     TableName: process.env.ACCESS_TOKEN_TABLE,
  //     Item: {userId, itemId}
  //   })
  // );
};
