var express = require('express'),
	crypto = require('crypto'),
	path = require('path'),
	escape = require('escape-html')

var sequelize = require(path.join(__dirname, '/../configuration/database'));
var Op = sequelize.Op

var Users = sequelize.import(path.join(__dirname, '/../models/users'));
var Posts = sequelize.import(path.join(__dirname, '/../models/posts'));
var Images = sequelize.import(path.join(__dirname, '/../models/images'));
var Categories = sequelize.import(path.join(__dirname, '/../models/categories'));

Posts.belongsTo(Users, {as: 'author'});
Posts.hasMany(Images, {foreignKey: 'postId'});
Posts.belongsTo(Categories);

function PostsControllers() {
	this.getAll = function(req, res) {
		let options = JSON.parse(req.params.options)

		let offset = Number(options.offset),
			limit = Number(options.limit),
			status = options.status

		Posts
			.findAll({
				where: {
					status: true
				},
				offset: offset,
				limit: limit,
				include: [{
					model: Users,
					as: 'author',
					attributes: ['username', 'name', 'email']
				}, {
					model: Images,
					attributes: ['url', 'isThumbnail']
				}, {
					model: Categories,
					as: 'category',
					attributes: ['name']
				}]
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
		let id = Number(req.params.id)

		Posts
			.findByPk(id, {
				where: {
					status: true
				},
				include: [{
					model: Users,
					as: 'author',
					attributes: ['username', 'name', 'email']
				}, {
					model: Images,
					attributes: ['url', 'isThumbnail']
				}, {
					model: Categories,
					as: 'category',
					attributes: ['name']
				}]
			})
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

	this.getNext = function(req, res) {
		let id = req.params.id

		if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.findByPk(id, {
					where: {
						status: true
					}
				})
				.then(function(posts) {
					if (posts == null) {
						res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan!'})
					} else {
						Posts
							.min('id', {
								where: {
									id: {
										[Op.gt]: id,
									},
									status: true,
									categoryId: posts.categoryId
								}
							})
							.then(function(min) {
								Posts
									.findByPk(min, {
										where: {
											status: true,
										},
										include: [{
											model: Users,
											as: 'author',
											attributes: ['username', 'name', 'email']
										}, {
											model: Images,
											attributes: ['url', 'isThumbnail']
										}, {
											model: Categories,
											as: 'category',
											attributes: ['name']
										}]
									})
									.then(function(posts) {
										if (posts == null) {
											res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan!'})
										} else {
											res.json({status: {success: true, code: 200}, message: 'Ambil post setelahnya berhasil!', data: posts})
										}
									})
									.catch(function(err) {
										res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
									})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Ambil max id post gagal!', err: err})
							})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
				})
		}
	}

	this.getPrevious = function(req, res) {
		let id = req.params.id

		if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.findByPk(id, {
					where: {
						status: true
					}
				})
				.then(function(posts) {
					if (posts == null) {
						res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan!'})
					} else {
						Posts
							.max('id', {
								where: {
									id: {
										[Op.lt]: id,
									},
									status: true,
									categoryId: posts.categoryId
								}
							})
							.then(function(max) {
								Posts
									.findByPk(max, {
										where: {
											status: true
										},
										include: [{
											model: Users,
											as: 'author',
											attributes: ['username', 'name', 'email']
										}, {
											model: Images,
											attributes: ['url', 'isThumbnail']
										}, {
											model: Categories,
											as: 'category',
											attributes: ['name']
										}]
									})
									.then(function(posts) {
										if (posts == null) {
											res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan!'})
										} else {
											res.json({status: {success: true, code: 200}, message: 'Ambil post sebelumnya berhasil!', data: posts})
										}
									})
									.catch(function(err) {
										res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
									})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Ambil max id post gagal!', err: err})
							})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
				})
		}
	}

	this.create = function(req, res) {
		let title = req.body.title,
			description = req.body.description,
			author = req.body.author,
			images = req.body.images,
			status = req.body.status

		if (title == null || description == null || images == 0 || status == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.create({
					title: title,
					description: description,
					author: author,
					status: status
				})
				.then(function(posts) {
					// (async function loop() {
					// 	try {
					// 		images.forEach(function(image) {
					// 			await Images.create({
					// 					url:image.url,
					// 					post: post.id,
					// 					isThumbnail: image.isThumbnail
					// 				})
					// 		})
					// 	} catch(err) {
					// 		Posts
					// 			.destroy({
					// 				where: {
					// 					id: post.id
					// 				}
					// 			})
					// 			.then(function(posts) {
					// 				res.json({status: {success: false, code: 500}, message: 'Buat image gagal! Buat post gagal!'})
					// 			})
					// 			.
					// 		res.json({status: {success: false, code: 500}, message: 'Buat image gagal!'})
					// 	}
					// })();
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
			description = req.body.description,
			author = req.body.author,
			images = req.body.images,
			status = req.body.status

		if (id == null || title == null || description == null || images == 0 || status == null) {
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
								description: description,
								author: author,
								status: status
							}, {
								where: {
									id: id
								}
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
						Images
							.destroy({
								where: {
									post: id
								}
							})
							.then(function(images) {
								Post
									.destroy({
										where: {
											id: id
										}
									})
									.then(function(post) {
										res.json({status: {success: true, code: 200}, message: 'Hapus image berhasil! Hapus post berhasil!'})
									})
									.catch(function(err) {
										res.json({status: {success: false, code: 500}, message: 'hapus image berhasil! Hapus post gagal!', err: err})
									})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Hapus image gagal! Hapus post gagal!'})
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