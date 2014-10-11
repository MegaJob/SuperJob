var mongoose = require('mongoose');
var acl = require('acl');

var ACL = new acl(new acl.mongodbBackend(mongoose.connection.db, "acl_", true));

module.exports = ACL;