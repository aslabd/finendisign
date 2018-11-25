var express = require('express'),
	crypto = require('crypto'),
	path = require('path'),
	jwt = require('jsonwebtoken'),
	mailer = require('../mailer');

var sequelize = require('../configuration/database');

var User = sequelize.import(__dirname + "/../models/user");

var validateEmail = function(email) {
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return email.match(regex);
}

function UsersControllers() {
	this.login = function(req, res){
		let email = req.body.email_user,
			password = req.body.password_user,
			remember_me = req.body.remember_me;

		if (!email || !password ) {
			res.json({status: false, message: 'Nama atau password user masih kosong!', err_code: 400});
		} else {
			User
				.findAll({
					where: {
						email_user: email,
						password_user: crypto.createHash('sha256').update(password).digest('hex'),
						status_user: true
					},
					attributes: [
						'nama_user',
						'email_user',
						'role_user',
						'status_user'
					]
				})
				.then(function(result) {
			      	if (result == null) {
				        res.json({status: false, message:'User tidak ditemukan!', err_code: 400});
			      	} else {
			        	var signInTime = Math.floor(Date.now() / 1000);
			        	if (remember_me == true) {
			          		var expireTime = signInTime + 99999999999;
			        	} else {
			          		var expireTime = signInTime + (2 * 60 * 60);
			        	}
			        	var data = { id: result[0].id_user, role: result[0].role_user, email: result[0].email_user, iat: signInTime, exp: expireTime };
			        	var token = jwt.sign(data, "YOUR_KEY_HERE");
			        	res.json({status: true, message: 'Login berhasil!', token: token});
			      	}
		    	})
		    	.catch(function(err) {
		    		res.json({status: false, message: 'Login gagal!', err_code: 400, err: err});
		    	})
		}
	}

	// fungsi tambah user sudah ditest
	this.add = function(req, res) {
		let name = req.body.name,
			username = req.body.username,
			email = req.body.emailr,
			password = req.body.password,
			password_confirm = req.body.password_confirm,
			role = req.body.role;

		if (!nama || !email || !password || !password_konfirmasi || !role) {
			res.json({status: {code: 400, success: false}, message: "Request tidak lengkap!"});
		} else if (password !== password_confirm) {
			res.json({status: {code: 400, success: false}, message: "Password berbeda dengan password konfirmasi!"});
		} else if(password.length < 6) {
			res.json({status: {code: 400, success: false}, message: "Password kurang panjang (minimal 6 karakter)!"});
		} else if (!validateEmail(email)) {
			res.json({status: {code: 400, success: false}, message: "Format email salah!"});
		} else {
			User
				.findAll({
					where: {
						[Op.or]: [{email: email}, {username: username}]
					}
				})
				.then(function(user) {
					if (user != 0) {
						res.json({status: {code: 400, success: false}, message: 'Email atau username sudah ada. Silahkan login.'})
					} else {
						User
							.create({
								nama_user: nama,
								email_user: email,
								password_user: crypto.createHash('sha256').update(password).digest('hex'),
								role_user: role
							})
							.then(function(result) {
								res.json({status: {code: 200, success: true}, message: 'Tambah user berhasil!'});
							})
							.catch(function(err) {
								res.json({status: {code: 500, success: false}, message: 'Tambah user gagal.', err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Cari user gagal.', err: err})
				})
		}
	}
}

module.exports = new UsersControllers();