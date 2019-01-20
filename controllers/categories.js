var	path = require('path')

var sequelize = require(path.join(__dirname, '/../configuration/database'));

var Categories = sequelize.import(path.join(__dirname, '/../models/categories'));

var Auth = require(path.join(__dirname, '/auth'));


function CategoriesControllers() {
	this.getAll = function(req, res) {
		Categories
			.findAll({
				where: {
					status: true
				}
			})
			.then(function(categories) {
				if (categories == 0) {
					res.json({status: {success: false, code: 404}, message: 'Category tidak ditemukan!'})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Ambil category berhasil!', data: categories})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Ambil category gagal!', err: err})
			})
	}

	this.create = async function(req, res) {
		let name = req.body.name,
			priorities = Number(req.body.priorities),
			description = req.body.description,
			status = req.body.status

		let auth = await Auth.auth(req)

		if (auth.code != 200) {
			res.json({status: {success: false, code: auth.code}, message: 'Tidak dapat akses fungsi!'})
		} else if (name == null || priorities == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Categories
				.create({
					name: name,
					priorities: priorities,
					description: description,
					status: status
				})
				.then(function(categories) {
					res.json({status: {success: true, code: 200}, message: 'Berhasil membuat category baru!'})
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Gagal membuat category baru!'})
				})
		}
	}

	this.update = async function(req, res) {
		let id = req.body.id,
			name = req.body.name,
			priorities = Number(req.body.priorities),
			description = req.body.description,
			status = req.body.status

		let auth = await Auth.auth(req)

		if (auth.code != 200) {
			res.json({status: {success: false, code: auth.code}, message: 'Tidak dapat akses fungsi!'})
		} else if (name == null || priorities == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Categories
				.findByPk(id)
				.then(function(categories) {
					if (categories == null) {
						res.json({status: {success: false, code: 404}, message: 'Category tidak ditemukan!'})
					} else {
						Categories
							.update({
								name: name,
								priorities: priorities,
								description: description,
								status: status
							})
							.then(function(categories) {
								res.json({status: {success: true, code: 200}, message: 'Update category berhasil!', data: categories})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Update category gagal!', err: err})
							})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Cari category gagal!', err: err})
				})
		}
	}

	this.delete = async function(req, res) {
		let id = req.body.id

		let auth = await Auth.auth(req)

		if (auth.code != 200) {
			res.json({status: {success: false, code: auth.code}, message: 'Tidak dapat akses fungsi!'})
		} else if (name == null || priorities == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Categories
				.findByPk(id)
				.then(function(categories) {
					if (categories == null) {
						res.json({status: {success: false, code: 404}, message: 'Category tidak ditemukan!'})
					} else {
						Categories
							.destroy({
								where: {
									id: id
								}
							})
							.then(function(categories) {
								res.json({status: {success: true, code: 200}, message: 'Hapus category berhasil!', data: categories})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Hapus category gagal!', err: err})
							})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Cari category gagal!', err: err})
				})
		}
	}
}

module.exports = new CategoriesControllers();