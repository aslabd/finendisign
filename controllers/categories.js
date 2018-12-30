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
}

module.exports = new CategoriesControllers();