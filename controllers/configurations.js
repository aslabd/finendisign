var	path = require('path')

var sequelize = require(path.join(__dirname, '/../configuration/database'));

var Configurations = sequelize.import(path.join(__dirname, '/../models/configurations'));


function ConfigurationsControllers() {
	this.getAll = function(req, res) {
		Configurations
			.findAll()
			.then(function(configurations) {
				if (configurations == 0) {
					res.json({status: {success: false, code: 404}, message: 'Configuration tidak ditemukan!'})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Ambil configuration berhasil!', data: configurations})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Ambil configuration gagal!', err: err})
			})
	}
}

module.exports = new ConfigurationsControllers();