var path = require('path')

var commonConfiguration = require(path.join(__dirname, '/../configuration/common'));

function UtilsControllers() {
	this.isEmail = function(email) {
		var regex = commonConfiguration.regex.email;
		return email.match(regex);
	}

	this.isPhoneNumber = function(phoneNumber) {

	}

	this.isImageURL = function(imageURL) {
		var regex = commonConfiguration.regex.imageURL;
		return imageURL.match(regex);
	}
}

module.exports = new UtilsControllers();