module.exports = function(sequelize, DataType) {
	return sequelize.define('post', {
		title: DataType.STRING,
		description: DataType.STRING,
		status: {
			type: DataType.BOOLEAN,
			defaulValue: true
		}
	})
}