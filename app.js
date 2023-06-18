const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
//schemas
const User = require("./model/user");
const Message = require("./model/message");
const Group = require("./model/group");
const GroupList = require("./model/grouplist");
// const MessageList = require("./model/messagelist");
//Route
const UserRoute = require("./Route/User");
const MessageRoute = require("./Route/message");
const GroupRoute = require("./Route/group");
//Database
const DB = require("./utli/database");
//middleware
app.use(bodyparser.json({ extended: false }));
app.use(cors());
app.use(UserRoute);
app.use(MessageRoute);
app.use(GroupRoute);

//associations
//user message
User.hasMany(Message);
Message.belongsTo(User);

//group
User.belongsToMany(Group, { through: GroupList });
Group.belongsToMany(User, { through: GroupList });

//message and group
Message.belongsTo(Group);
Group.hasMany(Message);

//sening error message when no route found
app.use("/", (req, res, next) => {
  console.log(req);
});
DB.sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected");
    });
  })
  .catch((err) => console.log(err));
