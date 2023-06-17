const express = require("express");
const route = express.Router();
const User = require("../controller/user");

route.post("/user/login", User.userLogin);
route.post("/user/signup", User.userSignup);
module.exports = route;
