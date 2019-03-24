var path = require('path');

var commonConfiguration = require(path.join(__dirname, '/../configuration/common'));

function UtilsControllers() {
	// Validator
	this.regexValidator = function(regex, test) {
		return test.match(regex);
	}

	this.isEmail = function(email) {
		return this.regexValidator(commonConfiguration.regex.email, email);
	}

	this.isPhoneNumber = function(phoneNumber) {
		return this.regexValidator(commonConfiguration.regex.phoneNumber, phoneNumber);
	}

	this.isImageURL = function(imageURL) {
		return this.regexValidator(commonConfiguration.regex.imageURL, imageURL);
	}

	this.isPassword = function(password) {
		return this.regexValidator(commonConfiguration.regex.password, password);
	}

	this.deleteValueFromArrayString = function(array) {
		
	}
}

module.exports = new UtilsControllers();