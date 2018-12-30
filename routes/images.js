var express = require('express');
var path = require('path');
var router = express.Router();

var images = require(path.join(__dirname, '/../controllers/images'));

/* GET home page. */
router.get('/', function(req, res) {
	res.json({status: {success: false, code: 404}, message: 'Not Found!'})
});

router.get('/get/all/:options', function(req, res) {
	images.getAll(req, res)
});

module.exports = router;
