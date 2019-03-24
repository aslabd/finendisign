var path = require('path')
var jwt = require('jsonwebtoken')

var commonConfiguration = require(path.join(__dirname, '/../configuration/common'))

function AuthControllers() {
	this.auth = function(req) {
		return new Promise(function (resolve, reject) {
			let result = {
				code: 200,
				decoded: null,
				err: null
			}

			if (commonConfiguration.auth == false) {
				resolve(result)
			} else if (req.headers.authorization == null) {
				result.code = 401
				result.err = "Header authorization kosong!"
				resolve(result)
			} else {
				let token = req.headers.authorization.split(' ')[1]
				if (token == null) {
					result.code = 401
					result.err = "Token kosong!"
					resolve(result)
				} else {
					jwt.verify(token, commonConfiguration.jwt.key, function(err, decoded) {
						if (err) {
							result.code = 403
							result.err = err
							resolve(result)
						} else {
							result.code = 200
							result.decoded = decoded
							resolve(result)
						}
					})
				}
			}
		})
	}
}

module.exports = new AuthControllers();