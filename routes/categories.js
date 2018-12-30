var express = require('express');
var path = require('path');
var router = express.Router();

var categories = require(path.join(__dirname, '/../controllers/categories'));

/* GET home page. */
router.get('/', function(req, res) {
	res.json({status: {success: false, code: 404}, message: 'Not Found!'})
});

router.get('/get/all', function(req, res) {
	categories.getAll(req, res)
});

module.exports = router;
