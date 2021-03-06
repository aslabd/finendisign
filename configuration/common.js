module.exports = {
	host: {
		port: '3000'
	},
	jwt: {
		key: 'IniAdalahKeyTeramanDiDunia'
	},
	database: {
		name: 'finendis_web',
		username: 'username',
		password: 'password',
		host: 'localhost',
		type: 'mysql',
		operatorsAliases: false
	},
	contactMe: {
		email: {
			address: 'contact@finendisign.com',
			password: 'finendifinendi',
			host: "mail.finendisign.com",
			secure: true,
			port: 465
		}
	},
	regex: {
		email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		imageURL: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,
		phoneNumber: /([+][0-9]{12,15})|([0-9]{10,13})/,
		password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{6,}).*$/
	},
	auth: true
}
