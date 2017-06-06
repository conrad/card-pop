'use strict';

module.exports.create = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const email = requestBody.email;
  const password = requestBody.password;

  if (typeof email !== 'string' || typeof password !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create user because of validation errors.'));
    return;
  }

  // TODO: enable real encryption - no "real" passwords in the meantime.
  createUser(userInfo(email, password))
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
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to create user with email ${email}`
        })
      })
    });
};

const createUser = user => {
  console.log('Creating user');
  const userData = {
    TableName: process.env.USER_TABLE,
    Item: user,
  };
  return dynamoDb.put(userData).promise()
    .then(res => user);
};

const userInfo = (email, password) => {
  const timestamp = new Date().getTime();
  const hash = sha1(password);
  return {
    id: uuid.v1(),
    email: email,
    password: hash,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};