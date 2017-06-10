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

  const data = plaid.getAccessToken(event.requestBody.publicToken, function(err, accessToken) {
    if (err) {
      callback (null, {
        statusCode: 500,
        body: `Unable to get access token with public token.`
      });
    }

    accountsDb.put(data.itemId, data.accessToken);  // Don't need to wait for this to return.

    const accounts = plaid.getAccounts(function(err, res) {
      if (err) {
        callback(null, {
          statusCode: 500,
          body: `Failed to retrieve accounts from Plaid API`
        });
        return;
      }

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res);
      });



    });


  });

};
