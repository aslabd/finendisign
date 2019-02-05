const Sequelize = require('sequelize');

var path = require('path')

var commonConfiguration = require(path.join(__dirname, '/common'))

module.exports = new Sequelize(commonConfiguration.database.name, commonConfiguration.database.username, commonConfiguration.database.password, {
    host: commonConfiguration.database.host,
    dialect: commonConfiguration.database.type,
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: commonConfiguration.database.operatorAliases
});