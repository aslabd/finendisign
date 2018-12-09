module.exports = function(sequelize, DataType) {
	return sequelize.define('post', {
		title: DataType.TEXT('tiny'),
		thumbnail: DataType.TEXT('tiny'),
		description: DataType.TEXT('tiny'),
		content: DataType.TEXT,
		status: {
			type: DataType.BOOLEAN,
			defaultValue: true
		}
	})
}