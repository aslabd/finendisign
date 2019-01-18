module.exports = function(sequelize, DataType) {
	return sequelize.define('socmed', {
		name: {
			type: DataType.TEXT('tiny'),
			allowNull: false
		},
		account: {
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