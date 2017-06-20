const cryptoJs = require('crypto-js');


class LoginService {
  constructor(db) {
    this.db = db;
  }

  checkCredentials(email, password, callback) {
    if (typeof email !== 'string' || typeof password !== 'string') {
      console.error('Validation Failed');
      callback(new Error('Couldn\'t create user because of validation errors.'));
      return;
    }

    // TODO: Push hashing functionality into enigma.
    const hashPassword = cryptoJs.SHA256(password).toString(cryptoJs.enc.Base64);

    this.db.getUser(email)
    .then(res => {
      // Create session & send session access token
      console.log('check login results: ' + JSON.stringify(res));
      if (res.Item.password === hashPassword) {
        callback(null, {
          statusCode: 200,
          body: 'Yes, you may pass.'
        });

        // TODO: Write to db to update last login.

      } else {
        callback(null, {
          statusCode: 200,
          body: 'Oprosti. You may not be who you claim to be.'
        });
      }
    })
    .catch(err => {
      console.log('error with checking login credentials: ' + JSON.stringify(err));
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(err)
      });
    });
  }
}

module.exports = LoginService;
