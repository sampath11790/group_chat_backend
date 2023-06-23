const express = require("express");
const route = express.Router();
const User = require("../controller/user");
const TokenValidation = require("../middleware/authentication");
route.post("/user/login", User.userLogin);
route.post("/user/signup", User.userSignup);
route.get("/user/userlist", TokenValidation, User.getuserList);
module.exports = route;
