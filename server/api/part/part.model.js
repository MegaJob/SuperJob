'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PartSchema = new Schema({
  identifier: { type: String, required: 'Identifier is required', uppercase: true },
  class:  String,
  type:   String,
  name: { type: String, required: 'Name is required' },
  amount: String,
  limit:  String
});

/* identifier */
// Validate empty identifier
PartSchema
  .path('identifier')
  .validate(function(identifier) {
    return identifier && identifier.length;
  }, 'Identifier cannot be blank');
// Validate identifier is not taken
PartSchema
  .path('identifier')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({identifier: value}, function(err, part) {
      if(err) throw err;
      if(part) {
        if(self.id === part.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified identifier is already in use.');

/* name */
// Validate empty name
PartSchema
  .path('name')
  .validate(function(name) {
    return name && name.length;
  }, 'Name cannot be blank');
// Validate name is not taken
PartSchema
  .path('name')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({name: value}, function(err, part) {
      if(err) throw err;
      if(part) {
        if(self.id === part.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified name is already in use.');


/**
 * Pre-save hook
 */
PartSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();
    next();
  });

module.exports = mongoose.model('Part', PartSchema);