'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var flow = require('nimble');
var _ = require('lodash');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    // OLD_IMPLEMENTATION:
    // var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    // res.json({ token: token });
    res.json(200, user.profile);
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userName = req.params.name;

  User.findOne({ name: userName }, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Update an existing user
 */
exports.update = function (req, res) {
  if(req.body._id) { delete req.body._id; }

  var userName = req.params.name;

  User.findOne({ name: userName }, function (err, user) {
    if (err) return res.send(500, err);
    if (!user) return res.send(401);
    var updated = _.merge(user, req.body);

    flow.series([
      function(callback) {
        // Save picture
        if (req.body.picture && req.body.picture.file && req.body.picture.file.path) {
          var picPath         = process.cwd() + '/' + req.body.picture.file.path;
          var userPicsPath    = process.cwd() + '/client/assets/images/users/' + user.name;
          var userPicFilename = 'pic' + path.extname(picPath);
          var userPicsURL     = 'assets/images/users/' + user.name + '/' + userPicFilename;

          flow.series([
            function(done) {
              fs.mkdir(userPicsPath, function(err) {
                done();
              });
            },
            function(done) {
              fs.rename(picPath,
                userPicsPath + '/' + userPicFilename,
                function(err) {
                  done();
                });
            },
            function(done) {
              updated.personal.photo = userPicsURL;
              callback();
              done();
            }
          ]);
        } else {
          callback();
        }
      },
      function() {
        updated.save(function (err, user) {
          if (err) { return res.send(500, err); }
          return res.json(200, user.profile);
        });
      }
    ]);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findOneAndRemove({ name: req.params.name }, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
/* exports.changePassword = function(req, res, next) {
  var userName = req.user.name;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.find({ name: userName}, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
}; */

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
