'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var flow = require('nimble');
var _ = require('lodash');

var user = {
  provider: 'local',
  name: 'fake_user',
  email: 'test@test.com',
  password: 'password'
};

describe('/api/users', function() {
  it('GET should respond with empty JSON array', function(done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.should.have.length(0);
        done();
      });
  });

  it('POST should create new user', function(done) {
    request(app)
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.should.have.property('name',  user.name);
        res.body.should.have.property('email', user.email);
        done();
      });
  });

  it('PUT should change user data', function(done) {
    var newData = {
      personal: {
        firstname: 'First Name'
      }
    };

    request(app)
      .put('/api/users/' + user.name)
      .send(newData)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.should.have.property('name', user.name);
        res.body.should.have.property('email', user.email);
        res.body.personal.should.have.property('firstname', newData.personal.firstname);
        done();
      });
  });

  it('POST should not create duplicated user', function(done) {
    request(app)
      .post('/api/users')
      .send(user)
      .expect(422)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.should.have.property('errors');
        res.body.errors.should.have.property(['name', 'email']);
        done();
      });
  });

  it('POST should create 5 users and GET should return them', function(done) {
    var usersNum = 5;

    flow.series([
      function(cb) {
        var requests = [];

        // Prepare several requests with different users
        for (var i = 0; i < usersNum; i++) {
          requests.push((function(counter) {
            return function(callback) {
              var newUser = _.clone(user);
              newUser.name += counter;
              newUser.email += counter;

              request(app)
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                  if (err) return done(err);
                  res.body.should.be.instanceof(Object);
                  callback();
                });
            };
          })(i));
        }

        requests.push(function(callback){
          callback();
          cb();
        });

        flow.series(requests);
      },
      function(cb) {
        request(app)
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            res.body.should.have.length(1 + usersNum);
            res.body.forEach(function(user) {
              user.should.have.property(['name', 'email']);
            });
            cb();
          });
      },
      function(cb) {
        cb();
        done();
      }
    ]);
  });

  it('DELETE should remove user', function(done) {
    var usersNum = 0;

    flow.series([
      function(cb) {
        request(app)
          .get('/api/users')
          .end(function(err, res) {
            if (err) return done(err);
            usersNum = res.body.length;
            cb();
          })
      },
      function(cb) {
        request(app)
          .delete('/api/users/' + user.name)
          .expect(204)
          .end(function(err, res) {
            if (err) return done(err);
            cb();
          });
      },
      function(cb) {
        request(app)
          .get('/api/users')
          .end(function(err, res) {
            if (err) return done(err);
            res.body.should.have.length(usersNum - 1);
            cb();
            done();
          })
      },
    ]);
  });
});
