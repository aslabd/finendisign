var express = require('express');
var path = require('path')
var router = express.Router();

var users = require(path.join(__dirname, '/../controllers/users'));

/* GET users */
router.get('/', function(req, res) {
  res.json({status: {success: false, code: 404}, message: 'Not Found!'})
});

router.get('/get/all', function(req, res) {
	users.getAll(req, res)
});

router.get('/get/:id', function(req, res) {
	users.get(req, res)
});

/* POST users */
router.post('/login', function(req, res) {
	users.login(req, res)
});

router.post('/create', function(req, res) {
	users.create(req, res)
});

router.patch('/update', function(req, res) {
	users.update(req, res)
});

router.delete('/delete', function(req, res) {
	users.delete(req, res)
});

module.exports = router;
