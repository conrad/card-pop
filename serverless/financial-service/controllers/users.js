'use strict';

let UserService = require('../services/UserService.js');
let LoginService = require('../services/LoginService.js');
const usersDb = require('../data/usersDb.js');

let userService = new UserService(usersDb);
let loginService = new LoginService(usersDb);


module.exports.login = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  loginService.checkCredentials(requestBody.email, requestBody.password, callback);
};


module.exports.create = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  if (requestBody == null) {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create user because of validation errors.'));
    return;
  }

  userService.create(requestBody.email, requestBody.password, callback)
};
