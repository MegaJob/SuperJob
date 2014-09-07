var basicAuth = require('basic-auth-connect');
var User = require('../lib/user');

exports.auth = basicAuth(User.authenticate);