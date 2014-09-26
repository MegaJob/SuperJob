/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Part = require('./part.model');

// Get list of parts
exports.index = function(req, res) {
  Part.find(function (err, parts) {
    if(err) { return handleError(res, err); }
    return res.json(200, parts);
  });
};