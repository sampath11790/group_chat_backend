const Sequelize = require("sequelize");
const sequelize = require("../utli/database");

const GroupList = sequelize.define("grouplist", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  admin: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = GroupList;
