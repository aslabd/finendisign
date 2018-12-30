var path = require('path')

var sequelize = require(path.join(__dirname, '/../configuration/database'));

var Users = sequelize.import(path.join(__dirname, '/../models/users'));
var Posts = sequelize.import(path.join(__dirname, '/../models/posts'));
var Images = sequelize.import(path.join(__dirname, '/../models/images'));
var Categories = sequelize.import(path.join(__dirname, '/../models/categories'));
var Configurations = sequelize.import(path.join(__dirname, '/../models/configurations'))

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

Users
	.sync()
	.then(function() {
		console.log('Finish: Categories');
		Categories
			.sync()
			.then(function() {
				console.log('Finish: Categories');
				Posts
					.sync()
					.then(function() {
						console.log('Finish: Posts');
						Images
							.sync()
							.then(function() {
								console.log('Finish: Images');
							})
							.catch(function(err) {
								console.log(err);
							})
					})
					.catch(function(err) {
						console.log(err);
					})
			})
			.catch(function(err) {
				console.log(err);
			})
	})
	.catch(function(err) {
		console.log(err);
	})

Configurations
	.sync()
	.then(function() {
		console.log('Finish: Configurations');
	})
	.catch(function(err) {
		console.log(err);
	})
