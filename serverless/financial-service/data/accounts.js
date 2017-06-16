const uuid = require('uuid');
const AWS = require('aws-sdk');
const cryptoJS = require("crypto-js");

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.create = (userId, accounts, callback) => {
  console.log('storing accounts data');

  // loop through accounts here and put to DB separately for each row?

  const accountsData = packageAccountsData(userId, accounts);
  const accountsTblData = {
    TableName: process.env.USER_ACCOUNTS_TABLE,
    Item: accountsData,
  };

  return dynamoDb.put(accountsTblData).promise()
    .then(res => accountsData);
};


const packageAccountsData = (userId, data) => {
  let results = [];
  const accounts = data.accounts;
  const timestamp = new Date().getTime();

  for (let i = 0; i < accounts.length; i++) {
    const accountObj = {
      id: uuid.v1(),
      userId: userId,
      submittedAt: timestamp,
      mask: accounts[i].mask,
      account_id: accounts[i].account_id,
      currentBalance: accounts[i].balances.current,
      availableBalance: accounts[i].balances.available,
      limit: accounts[i].balances.limit,
      name: accounts[i].name,
      official_name: accounts[i].official_name,
      type: accounts[i].type,
      subtype: accounts[i].subtype
    };

    results.push(accountObj);
  }

  return results;
};
