class UserService {
  constructor(db) {
    this.db = db;
  }

  create(email, password, callback) {
    if (typeof email !== 'string' || typeof password !== 'string') {
      console.error('Validation Failed');
      callback(new Error('Couldn\'t create user because of validation errors.'));
      return;
    }

    // TODO: audit encryption method & enable
    this.db.saveUser(email, password)
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
      callback(new Error(`Unable to create user with email ${email}`));
    });
  }
}

module.exports = UserService;
