const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
//schemas
const User = require("./model/user");
const Message = require("./model/message");
//Route
const UserRoute = require("./Route/User");
const MessageRoute = require("./Route/message");
//Database
const DB = require("./utli/database");
//middleware
app.use(bodyparser.json({ extended: false }));
app.use(cors());
app.use(UserRoute);
app.use(MessageRoute);

//associations
User.hasMany(Message);
Message.belongsTo(User);
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
