const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
  }
);

module.exports = sequelize;
