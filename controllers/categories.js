var	path = require('path')

var sequelize = require(path.join(__dirname, '/../configuration/database'));

var Categories = sequelize.import(path.join(__dirname, '/../models/categories'));


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

	this.create = function(req, res) {
		let name = req.body.name,
			priorities = Number(req.body.priorities),
			description = req.body.description,
			status = req.body.status

		if (name == null || priorities == null) {
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
}

module.exports = new CategoriesControllers();