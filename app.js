const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const UserRoute = require("./Route/User");
//middleware
app.use(bodyparser.json());
app.use(cors());
app.use(UserRoute);

app.use("/", (req, res, next) => {
  console.log(req);
});
app.listen(process.env.PORT, () => {
  console.log(connected);
});
