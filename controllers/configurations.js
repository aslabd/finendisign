var	path = require('path')

var sequelize = require(path.join(__dirname, '/../configuration/database'));

var Auth = require(path.join(__dirname, '/auth'));

var Configurations = sequelize.import(path.join(__dirname, '/../models/configurations'));


function ConfigurationsControllers() {
	this.getAll = async function(req, res) {
		let auth = await Auth.auth(req)
		if (auth.code != 200) {
			status = [true]
		} else {
			status = [true, false]
		}

		Configurations
			.findAll({
				where: {
					status: status
				}
			})
			.then(function(configurations) {
				if (configurations.length == 0) {
					res.json({status: {success: false, code: 404}, message: 'Configuration tidak ditemukan!'})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Ambil configuration berhasil!', data: configurations})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Ambil configuration gagal!', err: err})
			})
	}

	this.get = function(req, res) {
		let id = Number(req.params.id)

		Configurations
			.findByPk(id)
			.then(function(configurations) {
				if (configurations == null) {
					res.json({status: {success: false, code: 404}, message: 'Configuration tidak ditemukan!'})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Ambil configuration berhasil!', data: configurations})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Ambil configuration gagal!', err: err})
			})
	}

	this.create = async function(req, res) {
		let key = req.body.key,
			value = req.body.value,
			status = req.body.status

		let auth = await Auth.auth(req)

		if (auth.code != 200) {
			res.json({status: {success: false, code: auth.code}, message: 'Tidak dapat akses fungsi!'})
		} else {
			Configurations
				.create({
					key: key,
					value: value,
					status: status
				})
				.then(function(configurations) {
					res.json({status: {success: true, code: 200}, message: 'Buat configuration berhasil!', data: configurations})
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Buat configuration gagal!', err: err})
				})
		}
	}

	this.update = async function(req, res) {
		let id = Number(req.body.id),
			key = req.body.key,
			value = req.body.value,
			status = req.body.status

		let auth = await Auth.auth(req)

		if (auth.code != 200) {
			res.json({status: {success: false, code: auth.code}, message: 'Tidak dapat akses fungsi!'})
		} else {
			Configurations
				.findByPk(id)
				.then(function(configurations) {
					if (configurations == null) {
						res.json({status: {success: false, code: 404}, message: 'Configuration tidak ditemukan!'})
					} else {
						Configurations
							.update({
								key: key,
								value: value,
								status: status
							}, {
								where: {
									id: id
								}
							})
							.then(function(configurations) {
								res.json({status: {success: true, code: 200}, message: 'Update configuration berhasil!'})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Update configuration gagal!', err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil configuration gagal!', err: err});
				})
		}
	}

	this.delete = async function(req, res) {
		let id = Number(req.body.id)

		let auth = await Auth.auth(req)

		if (auth.code != 200) {
			res.json({status: {success: false, code: auth.code}, message: 'Tidak dapat akses fungsi!'})
		} else {
			Configurations
				.findByPk(id)
				.then(function(configurations) {
					if (configurations == null) {
						res.json({status: {success: false, code: 404}, message: 'Configuration tidak ditemukan!'})
					} else {
						Configurations
							.destroy({
								where: {
									id: id
								}
							})
							.then(function(configurations) {
								res.json({status: {success: true, code: 200}, message: 'Hapus configuration berhasil!'})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Hapus configuration gagal!', err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil configuration gagal!', err: err});
				})
		}
	}
}

module.exports = new ConfigurationsControllers();