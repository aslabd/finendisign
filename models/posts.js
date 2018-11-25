module.exports = function(sequelize, DataType) {
	return sequelize.define('post', {
		title: DataType.STRING,
		description: DataType.STRING,
		email: DataType.STRING,
		password: DataType.STRING,
		role: {
			type: DataType.ENUM,
			value: ['super', 'admin'],
			defaulValue: 'admin'
		},
		status: {
			type: DataType.BOOLEAN,
			defaulValue: true
		}
	})
}