let assert = require('assert');
let sinon = require('sinon');
let LoginService = require('../../../financial-service/services/LoginService.js');

let dummyUserData = {
  "Item": {
    "password": "/rKsNNlEDNDdNSkR6eKxuJIz3AKMOxYRzivTbBer62I=",
    "id": "fdf63310-5598-11e7-bc1a-df14ae5eaa76",
    "email":"hammer@time.com",
    "lastLogin":1497950124222,
    "submittedAt":1497950124222,
    "updatedAt":1497950124222
  }
};
let stubUsersDb = {
  getUser: sinon.stub().returns(dummyUserData)
};
let loginService = new LoginService(stubUsersDb);


describe('LoginService', function() {
  describe('checkCredentials', function() {
    it('should call the callback with an error when email type is invalid', function() {
      let spyCb = sinon.spy();
      loginService.checkCredentials(1, 'dog', spyCb);

      assert.equal('Error', spyCb.getCall(0).args[0].name);
    })

    it('should call the callback with an error when password type is invalid', function() {
      let spyCb = sinon.spy();
      loginService.checkCredentials('dog@dog.com', 1, spyCb);

      assert.equal('Error', spyCb.getCall(0).args[0].name);
    })

    // it('should call callback with an error when the inputs are invalid', function() {
    //   let spyCb = sinon.spy();
    //   loginService.checkCredentials('dog@dog.co', 'woof', spyCb);
    //
    //   assert.equal('Error', spyCb.getCall(0).args[0].name);
    // })
  });
});
