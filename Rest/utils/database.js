const Sequelize = require('sequelize')
const key = require('../keys/keys.dev')

const sequelize = new Sequelize(key.DB_NAME, key.USER_NAME, key.USER_PASS, {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize