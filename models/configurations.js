module.exports = function(sequelize, DataType) {
	return sequelize.define('configuration', {
		key: {
			type: DataType.STRING,
			allowNull: false
		},
		value: {
			type: DataType.TEXT,
			allowNull: false
		},
		status: {
			type: DataType.BOOLEAN,
			defaultValue: true
		}
	}, {
		paranoid: true,
		timestamps: true,
		version: true
	})
}