'use strict';

var should = require('should');
var app = require('../../app');
var Part = require('./part.model');

var partData = {
  identifier: 'KE-12',
  class: 'Class#1',
  type: 'Type#1',
  name: 'Железяка',
  amount: '12',
  limit: '1'
};
var part;

describe('Part Model', function() {
  before(function(done) {
    // Clear parts before testing
    Part.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function() {
    part = new Part(partData);
  });

  afterEach(function(done) {
    Part.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no parts', function(done) {
    Part.find({}, function(err, parts) {
      parts.should.have.length(0);
      done();
    });
  });

  it('should successfully save a part', function(done) {
    part.save(function(err, _part) {
      should.not.exist(err);
      Part.find(part, function(err, parts) {
        should.not.exist(err);
        parts[0].identifier.should.equal(part.identifier);
        done();
      });
    });
  });

  it('should fail when saving a duplicate part', function(done) {
    part.save(function(err, _part) {
      should.not.exist(err);
      var partDup = new Part(part);
      partDup.save(function(err, __part) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an identifier', function(done) {
    var _part = part;
    _part.identifier = '';
    _part.save(function(err, part) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving a part with already occupied identifier', function(done) {
    var anotherPart = new Part({
      identifier: part.identifier,
      class: part.class + '-1',
      type: part.type + '-1',
      name: part.name + '-1',
      amount: part.amount + '-1',
      limit: part.limit + '-1'
    });
    part.save(function(err, _part) {
      should.not.exist(err);
      anotherPart.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without a name', function(done) {
    var _part = part;
    _part.name = '';
    _part.save(function(err, part) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving a part with already occupied name', function(done) {
    var anotherPart = new Part({
      identifier: part.identifier + '-1',
      class: part.class + '-1',
      type: part.type + '-1',
      name: part.name,
      amount: part.amount + '-1',
      limit: part.limit + '-1'
    });
    part.save(function(err, _part) {
      should.not.exist(err);
      anotherPart.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });
});
