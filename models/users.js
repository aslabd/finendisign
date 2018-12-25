module.exports = function(sequelize, DataType) {
	return sequelize.define('user', {
		name: {
			type: DataType.STRING,
			allowNull: false
		},
		username: {
			type: DataType.STRING,
			allowNull: false,
			unique: true
		},
		email: {
			type: DataType.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataType.TEXT,
			allowNull: false
		},
		role: {
			type: DataType.ENUM('super', 'admin'),
			defaultValue: 'admin'
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