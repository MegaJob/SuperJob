'use strict';

var express = require('express');
var controller = require('./part.controller');
var multipart = require('connect-multiparty');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.post('/uploadpic', multipart({
    uploadDir: "./tmp"
  }), function (req, res) {
	console.log(req.body);
	console.log(req.files);
	return res.json(200, req.files);
});

module.exports = router;