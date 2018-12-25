var express = require('express');
var path = require('path')
var router = express.Router();

var posts = require(path.join(__dirname, '/../controllers/posts'));

/* GET users */
router.get('/', function(req, res) {
  res.json({status: {success: false, code: 404}, message: 'Not Found!'})
});

router.get('/get/all', function(req, res) {
	posts.getAll(req, res)
});

router.get('/get/:id', function(req, res) {
	posts.get(req, res)
});

/* POST users */
router.post('/create', function(req, res) {
	posts.create(req, res)
});

router.patch('/update', function(req, res) {
	posts.create(req, res)
});

router.delete('/delete', function(req, res) {
	posts.delete(req, res)
});

module.exports = router;
