var express = require('express'),
	crypto = require('crypto'),
	path = require('path'),
	escapeHTML = require('escape-html')

var sequelize = require(path.join(__dirname, '/../configuration/database'));
var Op = sequelize.Op

var Auth = require(path.join(__dirname, '/auth'));

var Users = sequelize.import(path.join(__dirname, '/../models/users'));
var Posts = sequelize.import(path.join(__dirname, '/../models/posts'));
var Images = sequelize.import(path.join(__dirname, '/../models/images'));
var Categories = sequelize.import(path.join(__dirname, '/../models/categories'));

Posts.belongsTo(Users, {as: 'author'});
Posts.hasMany(Images, {foreignKey: 'postId'});
Posts.belongsTo(Categories);

function PostsControllers() {
	this.getAll = async function(req, res) {
		let options = JSON.parse(req.params.options)

		let offset = Number(options.offset),
			limit = Number(options.limit)

		let status

		let auth = await Auth.auth(req)
		if (auth.code != 200) {
			status = [true]
		} else {
			status = options.status
		}
		
		Posts
			.findAll({
				where: {
					status: {
						[Op.or]: status
					}
				},
				offset: offset,
				limit: limit,
				order: [
					['id', 'DESC']
				],
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
					res.json({status: {success: true, code: 200}, message: 'Belum ada post.', data: posts})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Berhasil ambil post.', data: posts})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Gagal ambil post. Kesalahan server.', err: err})
			});
	}

	this.getAllByCategoryId = async function(req, res) {
		let options = JSON.parse(req.params.options),
			categoryId = Number(req.params.categoryId)

		let offset = Number(options.offset),
			limit = Number(options.limit)

		let status
		
		let auth = await Auth.auth(req)
		if (auth.code != 200) {
			status = [true]
		} else {
			status = options.status
		}

		Posts
			.findAll({
				where: {
					status: {
						[Op.or]: status
					},
					categoryId: categoryId
				},
				offset: offset,
				limit: limit,
				order: [
					['id', 'DESC']
				],
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
					res.json({status: {success: true, code: 200}, message: 'Belum ada post.', data: posts})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Berhasil ambil post.', data: posts})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Gagal ambil post. Kesalahan server.', err: err})
			})
	}

	this.get = async function(req, res) {
		let id = Number(req.params.id)

		let status
		
		let auth = await Auth.auth(req)
		if (auth.code != 200) {
			status = [true]
		} else {
			status = [true, false]
		}

		Posts
			.findByPk(id, {
				where: {
					status: {
						[Op.or]: status
					}
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
					res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan.', data: posts})
				} else {
					res.json({status: {success: true, code: 200}, message: 'Ambil post dengan id berhasil.', data: posts})
				}
			})
			.catch(function(err) {
				res.json({status: {success: false, code: 500}, message: 'Gagal ambil post dengan id. Kesalahan server.', err: err})
			})
	}

	this.isLastNextSameCategoryId = async function(req, res) {
		let id = req.params.id

		let status
		
		let auth = await Auth.auth(req)
		if (auth.code != 200) {
			status = [true]
		} else {
			status = [true, false]
		}

		if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.findByPk(id, {
					where: {
						status: {
							[Op.or]: status
						}
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
							.count({
								where: {
									id: {
										[Op.gt]: id,
									},
									status: true,
									categoryId: posts.categoryId
								}
							})
							.then(function(count) {
								res.json({status: {success: true, code: 200}, message: 'Ambil count post selanjutnya berhasil!', data: count})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Ambil count post selanjutnya gagal!', err: err})
							});
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
				})
		}
	}

	this.isLastPreviousSameCategoryId = async function(req, res) {
		let id = req.params.id

		let status
		
		let auth = await Auth.auth(req)
		if (auth.code != 200) {
			status = [true]
		} else {
			status = [true, false]
		}

		if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.findByPk(id, {
					where: {
						status: {
							[Op.or]: status
						}
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
							.count({
								where: {
									id: {
										[Op.lt]: id,
									},
									status: true,
									categoryId: posts.categoryId
								}
							})
							.then(function(count) {
								res.json({status: {success: true, code: 200}, message: 'Ambil count post sebelumnya berhasil!', data: count})
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Ambil count post sebelumnya gagal!', err: err})
							});
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
				})
		}
	}

	this.getNextSameCategoryId = async function(req, res) {
		let id = req.params.id

		let status
		
		let auth = await Auth.auth(req)
		if (auth.code != 200) {
			status = [true]
		} else {
			status = [true, false]
		}

		if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.findByPk(id, {
					where: {
						status: {
							[Op.or]: status
						}
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
								if (isNaN(min)) {
									res.json({status: {success: false, code: 404}, message: 'Post selanjutnya tidak ditemukan!'})
								} else {
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
								}
							})
							.catch(function(err) {
								res.json({status: {success: false, code: 500}, message: 'Ambil min id post gagal!', err: err})
							})
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
				})
		}
	}

	this.getPreviousSameCategoryId = async function(req, res) {
		let id = req.params.id

		let status
		
		let auth = await Auth.auth(req)

		if (auth.code != 200) {
			status = [true]
		} else {
			status = [true, false]
		}

		if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.findByPk(id, {
					where: {
						status: {
							[Op.or]: status
						}
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
								if (isNaN(max)) {
									res.json({status: {success: false, code: 404}, message: 'Post selanjutnya tidak ditemukan!'})
								} else {
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
								}
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

	this.create = async function(req, res) {
		let title = req.body.title,
			description = req.body.description,
			images = req.body.images,
			categoryId = req.body.categoryId,
			status = req.body.status

		let auth = await Auth.auth(req)

		if (auth.code != 200) {
			res.json({status: {success: false, code: auth.code}, message: 'Tidak dapat akses fungsi!'})
		} else if (title == null || description == null || images.length == 0 || status == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.create({
					title: title,
					description: description,
					authorId: auth.decoded.id,
					categoryId: categoryId,
					status: status
				})
				.then(function(posts) {
					let i
					(async function() {
						for (i = 0; i < images.length; i++) {
							try {
								await Images.create({
									url: images[i].url,
									postId: posts.id,
									isThumbnail: images[i].isThumbnail
								})
							} catch (err) {
								break
							}
						}

						if (i == (images.length)) { 
							res.json({status: {success: true, code: 200}, message: 'Buat post berhasil!', data: posts})
						} else if (i > 0) {
							(async function() {
								try {
									await Images.destroy({
										where: {
											postId: posts.id
										}
									})

									await Posts.destroy({
										where: {
											id: posts.id
										}
									})

									res.json({status: {success: false, code: 500}, message: 'Simpan image gagal! Buat post gagal!'})
								} catch (err) {
									res.json({status: {success: false, code: 500}, message: 'Destroy gagal! Buat post gagal!', err: err})
								}
							})();
						} else {
							(async function() {
								try {
									await Posts.destroy({
										where: {
											id: posts.id
										}
									})

									res.json({status: {success: false, code: 500}, message: 'Simpan image gagal! Buat post gagal!'})
								} catch (err) {
									res.json({status: {success: false, code: 500}, message: 'Destroy gagal! Buat post gagal!', err: err})
								}
							})();
						}
					})();
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Buat post gagal!', err: err})
				})
		}
	}

	this.update = async function(req, res) {
		let id = req.body.id,
			title = req.body.title,
			description = req.body.description,
			images = req.body.images,
			categoryId = req.body.categoryId,
			status = req.body.status

		let auth = await Auth.auth(req)

		if (auth.code != 200) {
			res.json({status: {success: false, code: auth.code}, message: 'Tidak dapat akses fungsi!'})
		} else if (id == null || title == null || description == null || images == 0 || status == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong.'})
		} else {
			Posts
				.findByPk(id, {
					where: {
						authorId: auth.decoded.id
					},
					attributes: [
						'id',
						'authorId'
					]
				})
				.then(function(posts) {
					if (posts == null) {
						res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan!'})
					} else if (auth.decoded.id != posts.authorId && auth.decoded.role != 'super') {
						res.json({status: {success: false, code: 403}, message: 'Bukan author post!'})
					} else {
						(async function() {
							try {
								await Images
									.destroy({
										where: {
											postId: id
										}
									})

								Posts
									.update({
										title: title,
										description: description,
										categoryId: categoryId,
										status: status
									}, {
										where: {
											id: id
										}
									})
									.then(function(posts) {
										let i
										(async function() {
											for (i = 0; i < images.length; i++) {
												try {
													await Images.create({
														url: images[i].url,
														postId: posts.id,
														isThumbnail: images[i].isThumbnail
													})
												} catch (err) {
													break
												}
											}

											if (i == (images.length)) { 
												res.json({status: {success: true, code: 200}, message: 'Update post berhasil!', data: posts})
											} else if (i > 0) {
												(async function() {
													try {
														await Images.destroy({
															where: {
																postId: posts.id
															}
														})

														res.json({status: {success: false, code: 500}, message: 'Update image gagal! Update post gagal!'})
													} catch (err) {
														res.json({status: {success: false, code: 500}, message: 'Destroy gagal! Update post gagal!', err: err})
													}
												})();
											}
										})();
									})
									.catch(function(err) {
										res.json({status: {success: false, code: 500}, message: 'Update post gagal!', err: err})
									})
							} catch (err) {
								res.json({status: {success: false, code: 500}, message: 'Update post gagal!', err: err})
							}
						})();
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
				})
		}
	}

	this.delete = async function(req, res) {
		let id = req.body.id;

		let auth = await Auth.auth(req);

		if (auth.code != 200) {
			res.json({status: {success: false, code: auth.code}, message: 'Tidak dapat akses fungsi!'})
		} else if (id == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else {
			Posts
				.findByPk(id, {
					where: {
						authorId: auth.decoded.id
					},
					attributes: [
						'id',
						'authorId'
					]
				})
				.then(function(posts) {
					if (posts == null) {
						res.json({status: {success: false, code: 404}, message: 'Post tidak ditemukan!'})
					} else if (auth.decoded.id != posts.authorId && auth.decoded.role != 'super') {
						res.json({status: {success: false, code: 403}, message: 'Bukan author post!'})
					} else {
						Images
							.destroy({
								where: {
									postId: id
								}
							})
							.then(function(images) {
								Posts
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
								console.log(err)
								res.json({status: {success: false, code: 500}, message: 'Hapus image gagal! Hapus post gagal!', err: err})
							});
					}
				})
				.catch(function(err) {
					res.json({status: {success: false, code: 500}, message: 'Ambil post gagal!', err: err})
				});
		}
	}
}

module.exports = new PostsControllers();