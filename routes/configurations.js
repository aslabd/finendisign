var express = require('express');
var path = require('path');
var router = express.Router();

var configurations = require(path.join(__dirname, '/../controllers/configurations'));

/* GET home page. */
router.get('/', function(req, res) {
	res.json({status: {success: false, code: 404}, message: 'Not Found!'})
});

router.get('/get/all', function(req, res) {
	configurations.getAll(req, res)
});

module.exports = router;
