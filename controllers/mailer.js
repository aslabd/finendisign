var path = require('path'),
	nodemailer = require('nodemailer')

var commonConfiguration = require(path.join(__dirname, '/../configuration/common'));

var Utils = require(path.join(__dirname, '/utils'));

function MailerControllers() {
	this.transporter = function() {
		return nodemailer.createTransport({
		    host: "smtp.ethereal.email",
		    port: 587,
		    secure: false, // true for 465, false for other ports
		    auth: {
		    	user: commonConfiguration.contactMe.email.address, // generated ethereal user
		    	pass: commonConfiguration.contactMe.email.password // generated ethereal password
		    }
		})
	}

	this.setOptions = function(options) {
		let mailOptions = {
		    from: options.from, // sender address
		    to: options.to, // list of receivers
		    subject: options.subject, // Subject line
		    text: options.text, // plain text body
		    html: options.html // html body
		}
		return mailOptions
	}

	this.send = function(mailOptions) {
		return new Promise(function(resolve, reject) {
			(async function() {
				try {
					let send = await transporter.sendMail(mailOptions)
					resolve(send)
				} catch (err) {
					reject(err)
				}
			})();
		})
	}

	this.sendMessageToAdmin = function(req, res) {
		let subject = req.body.subject,
			firstname = req.body.firstname,
			lastname = req.body.lastname,
			email = req.body.email,
			message = req.body.message

		if (subject == null || firstname == null || email == null || message == null) {
			res.json({status: {success: false, code: 400}, message: 'Ada parameter yang kosong!'})
		} else if (!Utils.isEmail(email)) {
			res.json({status: {success: false, code: 400}, message: 'Format email salah.'})
		} else {
			let options = {
				from: {
					name: firstname + " " + lastname,
					address: email
				},
				to: commonConfiguration.contactMe.email.address,
				text: message,
				html: null
			}

			let emailInfo = setOptions(options)

			(async function() {
				try {
					let info = await send(emailInfo)
					res.json({status: {success: true, code: 200}, message: 'Kirim email berhasil!', data: info})
				} catch (err) {
					res.json({status: {success: false, code: 500}, message: 'Kirim email gagal!', err: err})
				}
			})()
		}
	}

	this.broadcastToSubscribers = function(req, res) {

	}
}

module.exports = new MailerControllers()