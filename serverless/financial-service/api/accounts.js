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
  }

  const data = plaid.getAccessToken(event.requestBody.publicToken);

  if (data.error) {
    callback (null, {
       statusCode: 500,
       body: `Unable to get access token with public token.`
     });
  }

  accountsDb.put(data.itemId, data.accessToken);

// STOPPED HERE. LET'S MAKE SURE WE'RE HANDLING ASYNC PROCESSES PROPERLY.
  const accounts = plaid.getAccounts(function(err, res) {
    if (err) {
      callback(null, {
        statusCode: 500,
        body: `Failed to retrieve accounts from Plaid APi`
      });

    }


  });

};
