module.exports = function(sequelize, DataType) {
	return sequelize.define('subscriber', {
		email: {
			type: DataType.TEXT('tiny'),
			allowNull: false
		},
		status: {
			type: DataType.BOOLEAN,
			defaultValue: false
		}
	}, {
		paranoid: true,
		timestamps: true,
		version: true
	})
}