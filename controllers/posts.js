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
					status: status
				},
				offset: offset,
				limit: limit,
				order: '"id" DESC',
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

	this.getAllByCategoryId = function(req, res) {
		let options = JSON.parse(req.params.options),
			categoryId = Number(req.params.categoryId)

		let offset = Number(options.offset),
			limit = Number(options.limit),
			status = options.status

		Posts
			.findAll({
				where: {
					status: status,
					categoryId: categoryId
				},
				offset: offset,
				limit: limit,
				order: '"id" DESC',
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
				if (posts == 0) {
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

	this.getNextSameCategoryId = function(req, res) {
		let id = req.params.id

		if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.findByPk(id, {
					where: {
						status: true
					},
					attributes: [
						'categoryId'
					]
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

	this.getPreviousSameCategoryId = function(req, res) {
		let id = req.params.id

		if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.findByPk(id, {
					where: {
						status: true
					},
					attributes: [
						'categoryId'
					]
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

		if (title == null || description == null || images.length == 0 || status == null) {
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
					let i = 0
					images.forEach(function(image) {
						Images
							.create({
								url:image[i].url,
								post: posts.id,
								isThumbnail: image[i].isThumbnail
							})
							.then(function(images) {
								i = i + 1
								if (i == images.length) {
									res.json({status: {success: true, code: 200}, message: 'Buat post berhasil!', data: post})
								}
							})
							.catch(function(err) {
								if (i > 0) {
									Images
										.destroy({
											where: {
												postId: posts.id
											}
										})
										.then(function(images) {
											Posts
												.destroy({
													where: {
														id: posts.id
													}
												})
												.then(function(posts) {
													res.json({status: {success: false, code: 500}, message: 'Buat image gagal! Buat post gagal!'})
												})
												.catch(function(err) {
													res.json({status: {success: false, code: 500}, message: 'Buat image gagal! Hapus post gagal!'})
												})
										})
										.catch(function(err) {
											res.json({status: {success: false, code: 500}, message: 'Hapus image gagal! Buat post gagal!'})
										})
								} else {
									Posts
										.destroy({
											where: {
												id: posts.id
											}
										})
										.then(function(posts) {
											res.json({status: {success: false, code: 500}, message: 'Buat image gagal! Buat post gagal!'})
										})
										.catch(function(err) {
											res.json({status: {success: false, code: 500}, message: 'Buat image gagal! Hapus post gagal!'})
										})
								}
							})
					})
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
			Posts
				.findByPk(id, {
					attributes: [
						'id'
					]
				})
				.then(function(posts) {
					if (posts == null) {
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
							.then(function(posts) {
								Image
									.findAll({
										where: {
											postId: posts.id
										},
										attributes: [
											'id'
										]
									})
									.then(function(images) {
										if (images.length == 0) {
											res.json({status: {success: true, code: 200}, message: 'Update post berhasil!'})
										} else {
											Image
											.destroy({
												where: {
													postId: posts.id
												}
											})
											.then(function(images) {
												let i = 0
												images.forEach(function(image) {
													Images
														.create({
															url:image.url,
															post: posts.id,
															isThumbnail: image.isThumbnail
														})
														.then(function(images) {
															i = i + 1
															if (i == images.length) {
																res.json({status: {success: true, code: 200}, message: 'Update post berhasil!', data: post})
															}
														})
														.catch(function(err) {
															if (i > 0) {
																Images
																	.destroy({
																		where: {
																			postId: posts.id
																		}
																	})
																	.then(function(images) {
																		Posts
																			.destroy({
																				where: {
																					id: posts.id
																				}
																			})
																			.then(function(posts) {
																				res.json({status: {success: false, code: 500}, message: 'Update post gagal: Update image gagal dan hapus post berhasil!'})
																			})
																			.catch(function(err) {
																				res.json({status: {success: false, code: 500}, message: 'Update post gagal: Update image gagal dan hapus post gagal!', err: err})
																			})
																	})
																	.catch(function(err) {
																		res.json({status: {success: false, code: 500}, message: 'Hapus image gagal! Buat post gagal!'})
																	})
															} else {
																Posts
																	.destroy({
																		where: {
																			id: posts.id
																		}
																	})
																	.then(function(posts) {
																		res.json({status: {success: false, code: 500}, message: 'Buat image gagal! Buat post gagal!'})
																	})
																	.catch(function(err) {
																		res.json({status: {success: false, code: 500}, message: 'Buat image gagal! Hapus post gagal!'})
																	})
															}
														})
												})
											})
											.catch(function(err) {
												res.json({status: {success: false, code: 500}, message: 'Update image gagal!', err: err})
											})
										}
									})
									.catch(function(err) {
										res.json({status: {success: false, code: 500}, message: 'Ambil image gagal!', err: err})
									})
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
			Posts
				.findByPk(id, {
					attributes: [
						'id'
					]
				})
				.then(function(posts) {
					if (posts == null) {
						res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan!'})
					} else {
						Images
							.destroy({
								where: {
									postId: id
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