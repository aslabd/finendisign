module.exports = function(sequelize, DataType) {
	return sequelize.define('image', {
		url: {
			type: DataType.TEXT('tiny'),
			allowNull: false
		},
		postId: {
			type: DataType.INTEGER,
			allowNull: false
		},
		isThumbnail: {
			type: DataType.BOOLEAN,
			defaultValue: false
		}
	}, {
		paranoid: true,
		timestamps: true,
		version: true
	})
}