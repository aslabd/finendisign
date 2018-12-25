var path = require('path'),
	crypto = require('crypto')

var sequelize = require(path.join(__dirname, '/../configuration/database'));

var Users = sequelize.import(path.join(__dirname, '/../models/users'));
var Posts = sequelize.import(path.join(__dirname, '/../models/posts'));

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
		thumbnail: 'https://s3-eu-west-1.amazonaws.com/froala-eu/temp_files%2F1545674609809-background-brick-wall-bricks-259915.jpg',
		description: 'Gambar Apa Saja',
		author: 1,
		content: '&lt;p style=&quot;text-align: center;&quot;&gt;&lt;img src=&quot;https://s3-eu-west-1.amazonaws.com/froala-eu/temp_files%2F1545674609809-background-brick-wall-bricks-259915.jpg&quot; style=&quot;width: 500px;&quot;&gt;&lt;img src=&quot;https://www.froala.com/assets/editor/media_files/photo4.jpg&quot; style=&quot;width: 500px;&quot;&gt;&lt;img src=&quot;https://www.froala.com/assets/editor/media_files/photo5.jpg&quot; style=&quot;width: 500px;&quot;&gt;&lt;/p&gt;',
		status: true
	}, {
		title: 'Senja',
		thumbnail: 'https://www.tourmaui.com/wp-content/uploads/Sunset-from-Haleakala.jpg',
		description: 'Langit Jingga di Sore Hari',
		author: 1,
		content: '&lt;p style=&quot;text-align: center;&quot;&gt;&lt;img src=&quot;https://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg&quot; style=&quot;width: 500px;&quot;&gt;&lt;img src=&quot;https://www.tourmaui.com/wp-content/uploads/Sunset-from-Haleakala.jpg&quot; style=&quot;width: 500px;&quot;&gt;&lt;img src=&quot;https://lonelyplanetwpnews.imgix.net/2018/04/sunset-Slovenia.jpg&quot; style=&quot;width: 500px;&quot;&gt;&lt;/p&gt;',
		status: true
	}, {
		title: 'Inilah Jakarta',
		thumbnail: 'https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/java/dki-jakarta/Image1.jpg',
		description: 'Main-Main ke Ibukota',
		author: 1,
		content: '&lt;p style=&quot;text-align: center;&quot;&gt;&lt;img src=&quot;https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/java/dki-jakarta/Image1.jpg&quot; style=&quot;width: 500px;&quot;&gt;&lt;img src=&quot;https://asialink.unimelb.edu.au/__data/assets/image/0009/2186667/Jakarta.jpg&quot; style=&quot;width: 500px;&quot;&gt;&lt;img src=&quot;https://1nsw6u.akamaized.net/application/files/3114/7279/2041/jakarta-destination.jpg&quot; style=&quot;width: 500px;&quot;&gt;&lt;/p&gt;',
		status: true
	}])
	.then(function(users) {
		console.log('Create dummy posts finished!')
	})
	.catch(function(err) {
		console.log(err)
	})