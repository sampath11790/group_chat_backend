const Sequelize = require("sequelize");
const sequelize = require("../utli/database");

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: Sequelize.STRING,
  },
});

module.exports = Message;
