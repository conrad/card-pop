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

    this.db.checkLogin(email, password)
    .then(res => {
      // Create session & send session access token
      console.log('check login results: ' + res);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "come on, dog. what is it? " + res
        })
      });
    })
    .catch(err => {
      console.log('error with checking login credentials: ' + err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: "bummer... " + err
        })
      });
    });
  }
}

module.exports = LoginService;
