'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var acl = require('../../components/acl');

var router = express.Router();

// router.get('/', auth.hasRole('admin'), controller.index);
// router.delete('/:id', auth.hasRole('admin'), controller.destroy);
// router.get('/me', auth.isAuthenticated(), controller.me);
// router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
// router.get('/:id', auth.isAuthenticated(), controller.show);
// router.post('/', controller.create);
router.get('/', controller.index);

router.get('/check1', function(req, res, next) {
	acl.isAllowed('lev', 'forums', 'put', function(err, isAllowed) {
	    if(err) return res.send(500, err);
		res.json(isAllowed);
	});
});

router.get('/check2', function(req, res, next) {
	acl.allowedPermissions('lev', 'news', function(err, permissions) {
	    if(err) return res.send(500, err);
		res.json(permissions);
	});
});

router.get('/check3', function(req, res, next) {
	acl.userRoles('lev', function(err, roles) {
	    if(err) return res.send(500, err);
		res.json(roles);
	});
});

router.get('/:name', controller.show);
router.post('/', controller.create);
router.put('/:name', controller.update);
router.patch('/:name', controller.update);
router.delete('/:name', controller.destroy);

module.exports = router;
