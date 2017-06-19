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
    })
    .catch(err => {
      console.log('error with checking login credentials: ' + err);
    });
  }
}

module.exports = LoginService;
