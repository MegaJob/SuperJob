'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PartSchema = new Schema({
  class: String,
  type: String,
  name: String,
  amount: String,
  limit: String
});

module.exports = mongoose.model('Part', PartSchema);