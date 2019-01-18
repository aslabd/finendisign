var path = require('path')

var commonConfiguration = require(path.join(__dirname, '/../configuration/common'));

function UtilsControllers() {
	// Validator
	this.isEmail = function(email) {
		var regex = commonConfiguration.regex.email;
		return email.match(regex);
	}

	this.isPhoneNumber = function(phoneNumber) {
		var regex = commonConfiguration.regex.phoneNumber;
		return phoneNumber.match(regex);
	}

	this.isImageURL = function(imageURL) {
		var regex = commonConfiguration.regex.imageURL;
		return imageURL.match(regex);
	}

	this.deleteValueFromArrayString = function(array) {
		
	}
}

module.exports = new UtilsControllers();