var path = require('path'),
	crypto = require('crypto')

var sequelize = require(path.join(__dirname, '/../configuration/database'));

var Users = sequelize.import(path.join(__dirname, '/../models/users'));
var Posts = sequelize.import(path.join(__dirname, '/../models/posts'));
var Images = sequelize.import(path.join(__dirname, '/../models/images'));
var Categories = sequelize.import(path.join(__dirname, '/../models/categories'));
var Configurations = sequelize.import(path.join(__dirname, '/../models/configurations'));

Users
	.bulkCreate([{
		username: 'aslamabdurrohim',
		name: 'Muhammad Aslam Abdurrohim',
		email: 'aslamabdurrohim@gmail.com',
		role: 'super',
		password: crypto.createHash('sha256').update('aslamabdurrohim').digest('hex')
	}, {
		username: 'm.aslam.abdurrohim',
		name: 'Muhammad Aslam Abdurrohim',
		email: 'm.aslam.abdurrohim@gmail.com',
		role: 'admin',
		password: crypto.createHash('sha256').update('m.aslam.abdurrohim').digest('hex')
	}, {
		username: 'miqdad.fawwaz',
		name: 'Miqdad Abdurrahman Fawwaz',
		email: 'miqdad.fawwaz@gmail.com',
		role: 'admin',
		password: crypto.createHash('sha256').update('miqdad.fawwaz').digest('hex')
	}, {
		username: 'finendi',
		name: 'Finendi',
		email: 'finendi@finendisign.com',
		role: 'super',
		password: crypto.createHash('sha256').update('finendifinendi').digest('hex')
	}])
	.then(function(users) {
		console.log('Create dummy users finished!')
	})
	.catch(function(err) {
		console.log(err)
	})

Posts
	.bulkCreate([{
		title: 'Hanya Asal Saja',
        description: 'Apapun Ada Disini',
        authorId: 1,
        categoryId: 1,
        status: true
	}, {
		title: 'Senja',
        description: 'Langit Oranye di Sore Hari',
        authorId: 1,
        categoryId: 1,
        status: true
	}, {
		title: 'Inilah Jakarta',
		description: 'Main-Main ke Ibukota',
		authorId: 1,
		categoryId: 1,
		status: true
	}, {
		title: 'Darkness',
        description: 'Lonely in the Dark',
        authorId: 1,
        categoryId: 1,
        status: true
	}])
	.then(function(users) {
		console.log('Create dummy posts finished!')
	})
	.catch(function(err) {
		console.log(err)
	})

Images
	.bulkCreate([{
		url: 'https://s3-eu-west-1.amazonaws.com/froala-eu/temp_files%2F1545674609809-background-brick-wall-bricks-259915.jpg',
		postId: 1,
		isThumbnail: true
	}, {
		url: 'https://www.froala.com/assets/editor/media_files/photo4.jpg',
		postId: 1,
		isThumbnail: false
	}, {
		url: 'https://www.froala.com/assets/editor/media_files/photo5.jpg',
		postId: 1,
		isThumbnail: false
	}, {
		url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg',
		postId: 2,
		isThumbnail: false
	}, {
		url: 'https://www.tourmaui.com/wp-content/uploads/Sunset-from-Haleakala.jpg',
		postId: 2,
		isThumbnail: true
	}, {
		url: 'https://lonelyplanetwpnews.imgix.net/2018/04/sunset-Slovenia.jpg',
		postId: 2,
		isThumbnail: false
	}, {
		url: 'https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/java/dki-jakarta/Image1.jpg',
		postId: 3,
		isThumbnail: false
	}, {
		url: 'https://asialink.unimelb.edu.au/__data/assets/image/0009/2186667/Jakarta.jpg',
		postId: 3,
		isThumbnail: false
	}, {
		url: 'https://1nsw6u.akamaized.net/application/files/3114/7279/2041/jakarta-destination.jpg',
		postId: 3,
		isThumbnail: true
	}, {
		url: 'https://i.ytimg.com/vi/2yKsDZrEF7U/maxresdefault.jpg',
		postId: 4,
		isThumbnail: false
	}, {
		url: 'https://i.pinimg.com/originals/35/65/a8/3565a86a038acd35f6e4cbd9493a706e.jpg',
		postId: 4,
		isThumbnail: false
	}, {
		url: 'https://i.pinimg.com/originals/19/bf/1e/19bf1e8c8cba1a299911274196c5677b.jpg',
		postId: 4,
		isThumbnail: true
	}])
	.then(function(users) {
		console.log('Create dummy images finished!')
	})
	.catch(function(err) {
		console.log(err)
	})

Categories
	.bulkCreate([{
		name: 'Illustration',
		priorities: 1,
		description: 'All illustrations that I made',
		status: true
	}, {
		name: 'Logo',
		priorities: 2,
		description: 'All logos that I made',
		status: true
	}, {
		name: 'Photograph',
		priorities: 3,
		description: 'All photograph that I took',
		status: false
	}])
	.then(function(users) {
		console.log('Create dummy categories finished!')
	})
	.catch(function(err) {
		console.log(err)
	})

Configurations
	.bulkCreate([{
		key: 'home-background',
		value: 'https://i.pinimg.com/originals/35/65/a8/3565a86a038acd35f6e4cbd9493a706e.jpg',
		status: true
	}])
	.then(function(users) {
		console.log('Create dummy configurations finished!')
	})
	.catch(function(err) {
		console.log(err)
	})