'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');

var userData = {
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
};
var user;

describe('User Model', function() {
  before(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function() {
    user = new User(userData);
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no users', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should not show hashed password and salt when retrieving user profile', function(done) {
    user.save(function(_, user) {
      user.profile.should.have.property('name');
      user.profile.should.have.property('email');
      user.profile.should.not.have.property('salt');
      user.profile.should.not.have.property('hashedPassword');
      done();
    });
  });

  it('should fail when saving a duplicate user', function(done) {
    user.save(function(err) {
      should.not.exist(err);
      var userDup = new User(userData);
      userDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without a name', function(done) {
    user.name = '';
    user.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving a user with already occupied name', function(done) {
    var anotherUser = new User({
      provider: 'local',
      name: user.name,
      email: 'another' + user.email,
      password: 'differentpassword'
    });
    user.save(function(err, _user) {
      should.not.exist(err);
      anotherUser.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving a user with already occupied email', function(done) {
    var anotherUser = new User({
      provider: 'local',
      name: 'Another ' + user.name,
      email: user.email,
      password: 'differentpassword'
    });
    user.save(function(err, _user) {
      should.not.exist(err);
      anotherUser.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it("should authenticate user if password is valid", function() {
    return user.authenticate('password').should.be.true;
  });

  it("should not authenticate user if password is invalid", function() {
    return user.authenticate('blah').should.not.be.true;
  });
});
