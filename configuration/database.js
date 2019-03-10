const Sequelize = require('sequelize');

var path = require('path')

var commonConfiguration = require(path.join(__dirname, '/common'))

module.exports = new Sequelize(commonConfiguration.database.name, commonConfiguration.database.user, commonConfiguration.database.password, {
    host: commonConfiguration.database.host,
    dialect: commonConfiguration.database.type,
    port: commonConfiguration.database.port,
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: commonConfiguration.database.operatorsAliases
});
