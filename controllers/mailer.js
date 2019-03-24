var path = require('path'),
	nodemailer = require('nodemailer')

var commonConfiguration = require(path.join(__dirname, '/../configuration/common'));

var Utils = require(path.join(__dirname, '/utils'));

function MailerControllers() {
	this.setOptions = function(options) {
		let mailOptions = {
		    from: options.from, // sender address
		    replyTo: options.replyTo,
		    to: options.to, // list of receivers
		    subject: options.subject, // Subject line
		    text: options.text, // plain text body
		    html: options.html // html body
		};
		console.log(mailOptions)
		return mailOptions;
	}

	this.send = function(mailOptions) {
		let transporter = nodemailer.createTransport({
		    host: commonConfiguration.contactMe.sender.email.host,
		    port: commonConfiguration.contactMe.sender.email.port,
		    secure: commonConfiguration.contactMe.sender.email.secure,
		    auth: {
		    	user: commonConfiguration.contactMe.sender.email.address, // generated ethereal user
		    	pass: commonConfiguration.contactMe.sender.email.password // generated ethereal password
		    }
		});

		return new Promise(function(resolve, reject) {
			(async function() {
				try {
					let send = await transporter.sendMail(mailOptions);
					resolve(send);
				} catch (err) {
					reject(err);
				}
			})();
		});
	}

	this.sendMessageToAdmin = async function(req, res) {
		let subject = req.body.subject,
			firstname = req.body.firstname,
			lastname = req.body.lastname,
			email = req.body.email,
			message = req.body.message;

		if (subject == null || firstname == null || email == null || message == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else if (!Utils.isEmail(email)) {
			res.json({status: {success: false, code: 400}, message: 'Format email salah!'})
		} else {
			let options = {
				from: {
					name: firstname + " " + lastname,
					address: email
				},
				subject: subject,
				replyTo: email,
				to: commonConfiguration.contactMe.receiver.email.address,
				text: message,
				html: null
			};

			let emailInfo = this.setOptions(options);
			console.log(emailInfo);

			try {
				let info = await this.send(emailInfo);
				res.json({status: {success: true, code: 200}, message: 'Kirim email berhasil!', data: info});
			} catch (err) {
				res.json({status: {success: false, code: 500}, message: 'Kirim email gagal!', err: err});
			};
		}
	}

	this.broadcastToSubscribers = function(req, res) {
		
	}
}

module.exports = new MailerControllers()
