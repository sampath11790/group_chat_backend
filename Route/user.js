const express = require("express");
const route = express.route();
const User = require("../controller/user");

route("/user/login", User.userLogin);
route("/user/signup", User.userLogin);
module.exports = route;
