var path = require('path')

var commonConfiguration = require(path.join(__dirname, '/../configuration/common'));

function UtilsControllers() {
	// Validator
	this.regexValidator = function(regex, test) {
		return test.match(regex)
	}

	this.isEmail = function(email) {
		return regexValidator(commonConfiguration.regex.email, email);
	}

	this.isPhoneNumber = function(phoneNumber) {
		return regexValidator(commonConfiguration.regex.phoneNumber, phoneNumber);
	}

	this.isImageURL = function(imageURL) {
		return regexValidator(commonConfiguration.regex.imageURL, imageURL);
	}

	this.isPassword = function(password) {
		return regexValidator(commonConfiguration.regex.password, password)
	}

	this.deleteValueFromArrayString = function(array) {
		
	}
}

module.exports = new UtilsControllers();