var	path = require('path')

var sequelize = require(path.join(__dirname, '/../configuration/database'));

var Posts = sequelize.import(path.join(__dirname, '/../models/posts'));
var Images = sequelize.import(path.join(__dirname, '/../models/images'));


function ImagesControllers() {
	this.getAll = function(req, res) {
		let options = JSON.parse(req.params.options)

		let offset = Number(options.offset),
			limit = Number(options.limit)
		
		Images
			.findAll({
				offset: offset,
				limit: limit
			})
			.then(function(images) {
				if (images == 0) {
					res.json({status: {success: false, code: 404}, message: 'Image tidak ditemukan!'})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Ambil image berhasil!', data: images})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Ambil image gagal!', err: err})
			})
	}
}

module.exports = new ImagesControllers();