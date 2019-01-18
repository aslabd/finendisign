module.exports = {
	host: {
		port: '3000'
	},
	jwt: {
		key: 'IniAdalahKeyTeramanDiDunia'
	},
	database: {
		name: 'finendisign',
		username: 'root',
		password: '',
		host: 'localhost',
		type: 'mysql'
	},
	contactMe: {
		email: {
			address: 'admin@finendisign.com'
			password: 'passwordnyapahayooo'
		}
	},
	regex: {
		email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	}
	auth: true
}