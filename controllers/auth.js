function AuthControllers() {
	this.auth = function(req, callback) {
		let token = req.headers.authorization.split(' ')[1]
		if (token == null) {
			callback(401)
		} else {
			jwt.verify(token, common.jwt.key, function(err, decoded) {
				if (err) {
					callback(403)
				} else {
					callback(200)
				}
			})
		}
	}
}

module.exports = new AuthControllers()