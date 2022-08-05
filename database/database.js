const Sequelize = require('sequelize');

//database configuration
const connection = new Sequelize('guiapress', 'root', 'Pedro1999', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;