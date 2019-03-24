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
		host: '178.128.212.214',
		port: 3306,
		type: 'mysql',
		operatorsAliases: false
	},
	contactMe: {
		sender: {
			email: {
				address: 'contact@finendisign.com',
				password: 'finendifinendi',
				host: 'mail.finendisign.com',
				secure: true,
				port: 465
			}
		},
		receiver: {
			email: {
				address: 'finendi@finendisign.com'
			}
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
