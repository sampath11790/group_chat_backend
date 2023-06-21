const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
//schemas
const User = require("./model/user");
const Message = require("./model/message");
const Group = require("./model/group");
const GroupList = require("./model/grouplist");
// const MessageList = require("./model/messagelist");
app.use(cors());
const io = require("socket.io")(8001, {
  cors: {
    origin: "*",
  },
});

const accesslogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);
app.use(morgan("combined", { stream: accesslogStream }));
io.on("connection", (socket) => {
  console.log("calling socket", socket.id);
  socket.on("disconnect", () => {
    console.log(`A client disconnected. Connection ID: ${socket.id}`);
  });

  socket.on("send-message", (room) => {
    console.log("calling socket===========================");
    console.log(room);
    io.emit("receive-message", room);
  });
  socket.on("added-group", (useremail) => {
    console.log("received-added-group emit", useremail);
    io.emit("received-added-group", useremail);
  });
  socket.on("removed-group", (useremail) => {
    console.log("removed-group");
    io.emit("received-removed-group", useremail);
  });
  socket.on("delete-group", (group) => {
    console.log("delete-group");
    io.emit("received-deleted-group", group);
  });
});

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
