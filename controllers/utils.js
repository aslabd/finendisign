var commonConfiguration = require(path.join(__dirname, '/../configuration/common'));

function UtilsControllers() {
	this.isEmail(email) = function(email) {
		var regex = commonConfiguration.regex.email;
		return email.match(regex);
	}

}

module.exports = new UtilsControllers();