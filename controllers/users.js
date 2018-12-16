var express = require('express'),
	crypto = require('crypto'),
	path = require('path')

var sequelize = require('../configuration/database');
var Op = sequelize.Op

var User = sequelize.import(__dirname + "/../models/users");

var isEmail = function(email) {
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return email.match(regex);
}

function UsersControllers() {
	this.login = function(req, res) {
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

	this.create = function(req, res) {
		let username = req.body.username,
			name = req.body.name,
			email = req.body.email,
			role = req.body.role,
			password = req.body.password,
			confirm_password = req.body.confirm_password

		if (!username || !name || !email || !role || !password || !confirm_password) {
			res.json({status: {success: false, code: 400}, message: 'Ada form yang kosong.'})
		} if (!isEmail(email)) {
			res.json({status: {success: false, code: 400}, message: 'Format email salah.'})
		} else if (confirm_password != password) {
			res.json({status: {success: false, code: 400}, message: 'Password beda dengan konfirmasi.'})
		} else {
			User
				.findAll({
					where: {
						[Op.or]: [{username: username}, {email: email}]
					}
				})
				.then(function(user) {
					if (user != 0) {
						res.json({status: {success: false, code: 400}, message: 'Username atau email sudah ada.'})
					} else {
						User
							.create({
								username: username,
								name: name,
								email: email,
								role: role,
								password: crypto.createHash('sha256').update(password).digest('hex')
							})
							.then(function(user) {
								res.json({status: {success: true, code: 200}, message: 'Buat user berhasil.', data: user})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Buat user gagal.', err: err})
							})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Cari user gagal.', err: err});
				})
		}
	}
}

module.exports = new UsersControllers();