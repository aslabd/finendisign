const Sequelize = require('sequelize');

module.exports = new Sequelize('finendisign', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});