var express = require('express');
var path = require('path');
var router = express.Router();

var mailer = require(path.join(__dirname, '/../controllers/mailer'));

/* GET users */
router.get('/', function(req, res) {
	res.json({status: {success: false, code: 404}, message: 'Not Found!'})
});

/* POST users */
router.post('/send/admin', function(req, res) {
	mailer.sendMessageToAdmin(req, res)
});

router.post('/broadcast/subscriber', function(req, res) {
	mailer.broadcastToSubscribers(req, res)
});

module.exports = router;
