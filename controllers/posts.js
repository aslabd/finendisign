var express = require('express'),
	crypto = require('crypto'),
	path = require('path'),
	escape = require('escape-html')

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

	this.create = function(req, res) {
		let title = req.body.title,
			thumbnail = req.body.thumbnail,
			description = req.body.description,
			author = req.body.author,
			content = escape(req.body.content),
			status = req.body.status

		if (title == null || description == null || content == null || status == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong.'})
		} else {
			Post
				.create({
					title: title,
					thumbnail: thumbnail,
					description: description,
					author: author,
					content: content,
					status: status
				})
				.then(function(post) {
					res.json({status: {success: true, code: 200}, message: 'Buat post berhasil!', data: post})
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Buat post gagal!', err: err})
				})
		}
	}

	this.update = function(req, res) {
		let id = req.body.id,
			title = req.body.title,
			thumbnail = req.body.thumbnail,
			description = req.body.description,
			author = req.body.author,
			content = escape(req.body.content),
			status = req.body.status

		if (id == null || title == null || description == null || content == null || status == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong.'})
		} else {
			Post
				.findById(id)
				.then(function(post) {
					if (post == null) {
						res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan!'})
					} else {
						Post
							.update({
								title: title,
								thumbnail: thumbnail,
								description: description,
								author: author,
								content: content,
								status: status
							},
							where: {
								id: id
							})
							.then(function(post) {
								res.json({status: {success: true, code: 200}, message: 'Update post berhasil!', data: post})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Update post gagal!', err: err})
							})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
				})
		}
	}

	this.delete = function(req, res) {
		let id = req.body.id

		if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Post
				.findById(id)
				.then(function(post) {
					if (post == null) {
						res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan!'})
					} else {
						Post
							.destroy({
								where: {
									id: id
								}
							})
							.then(function(post) {
								res.json({status: {success: true, code: 200}, message: 'Hapus post berhasil!'})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Hapus post gagal!', err: err})
							})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
				})
		}
	}
}

module.exports = new PostsControllers();