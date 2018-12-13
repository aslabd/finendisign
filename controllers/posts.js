var express = require('express'),
	crypto = require('crypto'),
	path = require('path')

var sequelize = require('../configuration/database');

var User = sequelize.import(__dirname + "/../models/users");
var Post = sequelize.import(__dirname + "/../models/posts");

Post.belongsTo(User, {foreignKey: 'author'})

function PostsControllers() {
	this.getAll = function(req, res) {
		let offset = req.param.offset,
			limit = req.param.limit
			status = req.param.status

		Post
			.findAll({
				where: {
					status: true
				},
				offset: offset,
				limit: limit
			})
			.then(function(post) {
				if (post == 0) {
					res.json({status: {success: true, code: 200}, message: 'Belum ada post.', data: post})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Berhasil ambil post.', data: post})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Gagal ambil post. Kesalahan server.', err: err})
			})
	}

	this.get = function(req, res) {
		let id = req.param.id

		Post
			.findById(id)
			.then(function(post) {
				if (post == null) {
					res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan.', data: post})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Ambil post dengan id berhasil.', data: post})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Gagal ambil post dengan id. Kesalahan server.', err: err})
			})
	}
}

module.exports = new PostsControllers();