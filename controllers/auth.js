var path = require('path')

var commonConfiguration = require(path.join(__dirname, '/../configuration/common'))

function AuthControllers() {
	this.auth = function(req, callback) {
		let token = req.headers.authorization.split(' ')[1]
		if (commonConfiguration.auth == false) {
			callback(200)
		} else {
			if (token == null) {
				callback(401)
			} else {
				jwt.verify(token, commonConfiguration.jwt.key, function(err, decoded) {
					if (err) {
						callback(403)
					} else {
						callback(200)
					}
				})
			}
		}
	}
}

module.exports = new AuthControllers()