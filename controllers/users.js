var express = require('express'),
	crypto = require('crypto'),
	path = require('path')

var sequelize = require('../configuration/database');

var User = sequelize.import(__dirname + "/../models/users");

var validateEmail = function(email) {
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return email.match(regex);
}

function UsersControllers() {
	this.login = function(req, res){
		let username = req.body.username,
			password = req.body.password,
			remember_me = req.body.remember_me;

		if (!username || !password ) {
			res.json({status: {success: false, code: 400}, message: 'Username atau password user masih kosong!'});
		} else {
			User
				.findAll({
					where: {
						username: username,
						password: crypto.createHash('sha256').update(password).digest('hex'),
						status: true
					},
					attributes: [
						'name',
						'username',
						'role',
						'status'
					]
				})
				.then(function(user) {
			      	if (user == null) {
				        res.json({status: {success: false, code: 404}, message:'User tidak ditemukan!'});
			      	} else {
			        	var signInTime = Math.floor(Date.now() / 1000);
			        	if (remember_me == true) {
			          		var expireTime = signInTime + 99999999999;
			        	} else {
			          		var expireTime = signInTime + (2 * 60 * 60);
			        	}
			        	var data = {
			        		id: user[0].id,
			        		role: user[0].role,
			        		name: user[0].username,
			        		username: user[0].username,
			        		iat: signInTime,
			        		exp: expireTime
			        	};

			        	var token = jwt.sign(data, "YOUR_KEY_HERE");
			        	res.json({status: {success: true, code: 200}, message: 'Login berhasil!', token: token});
			      	}
		    	})
		    	.catch(function(err) {
		    		res.json({status: {success: false, code: 500}, message: 'Login gagal!', err: err});
		    	});
		}
	}
}

module.exports = new UsersControllers();