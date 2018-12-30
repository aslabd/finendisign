module.exports = function(sequelize, DataType) {
	return sequelize.define('category', {
		name: {
			type: DataType.TEXT('tiny'),
			allowNull: false
		},
		priorities: {
			type: DataType.INTEGER,
			allowNull: false
		},
		description: {
			type: DataType.TEXT,
			allowNull: true
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