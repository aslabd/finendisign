var crypto = require('crypto'),
	path = require('path'),
	jwt = require('jsonwebtoken')

var commonConfiguration = require(path.join(__dirname, '/../configuration/common'));

var sequelize = require(path.join(__dirname, '/../configuration/database'));
var Op = sequelize.Op

var Users = sequelize.import(path.join(__dirname + '/../models/users'));

var Auth = require(path.join(__dirname, '/auth'));
var Utils = require(path.join(__dirname, '/utils'));
var Mailer = require(path.join(__dirname, '/mailer'));

function UsersControllers() {
	this.getAll = function(req, res) {

		Users
			.findAll({
				attributes: [
					'name',
					'username',
					'role',
					'status'
				]
			})
			.then(function(users) {
				if (users.length == 0) {
					res.json({status: {success: false, code: 404}, message: 'User tidak ditemukan!'})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Ambil semua user berhasil!', data: users})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Ambil semua user gagal!', err: err})
			})
	}

	this.get = function(req, res) {
		let id = req.params.id

		if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'});
		} else {
			Users
				.findById(id, {
					attributes: [
						'name',
						'username',
						'role',
						'status'
					]
				})
				.then(function(users) {
					if (users == null) {
						res.json({status: {success: false, code: 404}, message: 'User tidak ditemukan!'})
					} else {
						res.json({status: {success: true, code: 200}, message: 'Ambil user berhasil!', data: users})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil user gagal!', err: err})
				})
		}
	}

	this.login = function(req, res) {
		let username = req.body.username,
			password = req.body.password,
			remember_me = req.body.remember_me;

		if (!username || !password ) {
			res.json({status: {success: false, code: 400}, message: 'Username atau password user masih kosong!'});
		} else if (!Utils.isPassword(password)) {
			res.json({status: {success: false, code: 400}, message: 'Format password salah! Minimal 6 karakter serta terdapat 1 huruf kecil, 1 huruf kapital, dan 1 angka'})
		} else {
			Users
				.findAll({
					where: {
						username: username,
						password: crypto.createHash('sha256').update(password).digest('hex'),
						status: true
					},
					attributes: [
						'id',
						'name',
						'username',
						'role',
						'status'
					]
				})
				.then(function(user) {
			      	if (user == 0) {
				        res.json({status: {success: false, code: 404}, message:'User tidak ditemukan!'});
			      	} else {
			        	let signInTime = Math.floor(Date.now() / 1000);
			        	if (remember_me == true) {
			          		var expireTime = signInTime + 99999999999;
			        	} else {
			          		var expireTime = signInTime + (2 * 60 * 60);
			        	}

			        	let data = {
			        		id: user[0].id,
			        		role: user[0].role,
			        		name: user[0].username,
			        		username: user[0].username,
			        		iat: signInTime,
			        		exp: expireTime
			        	};

			        	(async function() {
			        		try {
					        	let token = await jwt.sign(data, commonConfiguration.jwt.key);
					        	res.json({status: {success: true, code: 200}, message: 'Login berhasil!', token: token});
			        		} catch (err) {
			        			res.json({status: {success: false, code: 500}, message: 'Auth gagal!', err: err})
			        		}
			        	})();
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
		} else if (!Utils.isEmail(email)) {
			res.json({status: {success: false, code: 400}, message: 'Format email salah.'})
		} else if (!Utils.isPassword(password)) {
			res.json({status: {success: false, code: 400}, message: 'Format password salah! Minimal 6 karakter serta terdapat 1 huruf kecil, 1 huruf kapital, dan 1 angka'})
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

	this.update = function(req, res) {
		let id = req.body.id,
			username = req.body.username,
			name = req.body.name,
			email = req.body.email,
			role = req.body.role,
			password = req.body.password,
			confirm_password = req.body.confirm_password

		if (!username || !name || !email || !role || !password || !confirm_password) {
			res.json({status: {success: false, code: 400}, message: 'Ada form yang kosong.'})
		} else if (!Utils.isEmail(email)) {
			res.json({status: {success: false, code: 400}, message: 'Format email salah.'})
		} else if (!Utils.isPassword(password)) {
			res.json({status: {success: false, code: 400}, message: 'Format password salah. Minimal 6 karakter serta terdapat 1 huruf kecil, 1 huruf kapital, dan 1 angka'})
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
					if (user.length != 0) {
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

	this.delete = function(req, res) {

	}

	this.forgotPassword = function(req, res) {
		let username = req.body.username,
			email = req.body.email

		if (username == null && email == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Users
				.findOne({
					where: {
						[Op.or]: [{username: username}, {email: email}]
					}
				})
				.then(function(users) {
					if (users == null) {
						res.json({status: {success: false, code: 404}, message: 'User tidak ditemukan!'})
					} else {
						
					}
				})
		}
	}
}

module.exports = new UsersControllers();