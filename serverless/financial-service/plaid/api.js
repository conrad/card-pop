'use strict';

var envvar = require('envvar');
var bodyParser = require('body-parser');
var moment = require('moment');
var plaid = require('plaid');

var APP_PORT = envvar.number('APP_PORT', 8000);
var PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
var PLAID_SECRET = envvar.string('PLAID_SECRET');
var PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
var PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');

// We store the access_token in memory
// In production, store it in a secure persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

/**
 * @param {string} publicToken Token retrived from Plaid by FE integration
 *                               Link, which sends it here.
 * @param {function} cb Callback function initiate when
 *                        token exchange is complete.
 */
module.exports.getAccessToken = function (publicToken, cb) {
  PUBLIC_TOKEN = publicToken;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      console.log('Could not exchange public_token!' + '\n' + error);
      cb(error)  // Find out more about the structure this error
    }

    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);

    accessTokenDb.put()

    const res = { itemId: ITEM_ID, accessToken: ACCESS_TOKEN }
    cb(null, res);
  });
};

module.exports.setAccessToken = accessToken => {
  ACCESS_TOKEN = accessToken;
  return true;
};

/**
 * @return {object} Returns data objects on accounts for item (~institution)
 * TODO: Understand better the structure of this data.
 */
module.exports.getAccounts => {
  client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
    if (error != null) {
      var msg = 'Unable to pull accounts from the Plaid API.';
      console.log(msg + '\n' + error);

      return { error: msg };
    }

    return {
      accounts: authResponse.accounts,
      numbers: authResponse.numbers
    };
  });
};

/**
 * @return {object} Returns data objects on the item (~institution)
 * TODO: Understand better the structure of this data.
 */
module.exports.getItem => {
  // Pull Item - info on products available & billed, webhook info, etc.
  client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));

      return { error: error };
    }

    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
      if (err != null) {
        var msg = 'Unable to pull institution information from the Plaid API.';
        console.log(msg + '\n' + error);

        return { error: msg };
      } else {
        return {
          item: itemResponse.item,
          institution: instRes.institution
        };
      }
    });
  });
};

/**
 * @return {object} Returns data object on transactions for a user.
 * TODO: Understand better the structure of this data.
 */
module.export.getTransactions => {
  // Pull transactions for the Item for the last 30 days
  var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');

  client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0,
  }, function(error, transactionsResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));

      return { error: error };
    }
    console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');

    return transactionsResponse;
  });
};
