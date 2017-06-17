// TODO: Determine where auth happens on each request.
//       Should we always call Cognito with each request.
//       Can we add middleware for this?

const plaid = require('../plaid/api.js');

module.exports.add = (event, context, callback) => {
  const userId = event.requestBody.userId;
  const publicToken = event.requestBody.publicToken;
  if (!userId || !publicToken) {
    callback (null, {
       statusCode: 400,
       body: `public token & user ID must be provided with request.`
     });
     return;
  }

  // Check if you already have the access token
  //  or else call for it from plaid.

  const data = plaid.getAccessToken(userId, publicToken, function(err, accessTokenRes) {
    if (err) {
      callback (null, {
        statusCode: 500,
        body: `Unable to get access token with public token.`
      });
      return;
    }

    accessTokenDb.put(
      userId,
      accessTokenRes.itemId,
      accessTokenRes.accessToken
    );


    const accounts = plaid.getAccounts(function(error, accountsRes) {
      if (err) {
        callback(null, {
          statusCode: 500,
          body: `Failed to retrieve accounts from Plaid API`
        });
        return;
      }

      accountsDb.create(accountsRes);

      const accountsData = parseGetAccountsResponse(accountsRes);

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
