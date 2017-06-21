let assert = require('assert');
let sinon = require('sinon');
let UserService = require('../../../financial-service/services/UserService.js');

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
let userService = new UserService(stubUsersDb);

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('UserService', function() {
  describe('create', function() {
    it('should call the callback with an error when email type is invalid', function() {
      let spyCb = sinon.spy();
      userService.create(1, 'dog', spyCb);

      assert.equal('Error', spyCb.getCall(0).args[0].name);
    })

    it('should call the callback with an error when password type is invalid', function() {
      let spyCb = sinon.spy();
      userService.create('dog@dog.com', 1, spyCb);

      assert.equal('Error', spyCb.getCall(0).args[0].name);
    })

    // it('should call callback with an error when the inputs are invalid', function() {
    //   let spyCb = sinon.spy();
    //   userService.create('dog@dog.co', 'woof', spyCb);
    //
    //   assert.equal('Error', spyCb.getCall(0).args[0].name);
    // })
  });
});
