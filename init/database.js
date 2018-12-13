var sequelize = require(__dirname + "/../configuration/database")

var User = sequelize.import(__dirname + "/../models/users");
var Post = sequelize.import(__dirname + "/../models/posts");

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

User
	.sync()
	.then(function() {
		Post
			.sync()
			.then(function() {
				console.log('Finish.');
			})
			.catch(function(err) {
				console.log(err);
			})
	})
	.catch(function(err) {
		console.log(err);
	})
