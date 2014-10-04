/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var multipart = require('connect-multiparty');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/parts', require('./api/part'));

  app.use('/auth', require('./auth'));
  
  app.post('/upload', multipart({
      uploadDir: "./tmp"
    }), function (req, res) {
      return res.json(200, req.files);
    });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
