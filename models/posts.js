module.exports = function(sequelize, DataType) {
	return sequelize.define('post', {
		title: {
			type: DataType.TEXT('tiny'),
			allowNull: false
		},
		description: {
			type: DataType.TEXT,
			allowNull: true
		},
		authorId: {
			type: DataType.INTEGER,
			allowNull: false
		},
		categoryId: {
			type: DataType.INTEGER,
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