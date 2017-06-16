// TODO: Determine where auth happens on each request.
//       Should we always call Cognito with each request.
//       Can we add middleware for this?

const plaid = require('../plaid/api.js');

module.exports.add = (event, context, callback) => {
  if (event.requestBody.publicToken == null) {
    callback (null, {
       statusCode: 400,
       body: `public token must be provided with request.`
     });
     return;
  }

  const data = plaid.getAccessToken(event.requestBody.publicToken, function(err, res) {
    if (err) {
      callback (null, {
        statusCode: 500,
        body: `Unable to get access token with public token.`
      });
    }

    const itemId      = res.itemId;
    const accessToken = res.accessToken;

    const accounts = plaid.getAccounts(function(error, result) {
      if (err) {
        callback(null, {
          statusCode: 500,
          body: `Failed to retrieve accounts from Plaid API`
        });
        return;
      }

      accountsDb.create(res);

      const accountsData = parseGetAccountsResponse(res);

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(accountsData);
      });
    });
  });
};

const parseGetAccountsResponse = response => {
  let results = [];
  const accounts = response.accounts;
  const timestamp = new Date().getTime();

  for (let i = 0; i < accounts.length; i++) {
    const accountObj = {
      mask: accounts[i].mask,
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
