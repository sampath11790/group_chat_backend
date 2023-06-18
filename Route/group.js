const express = require("express");

const TokenValidation = require("../middleware/authentication");
const { creategroup } = require("../controller/group");

const route = express.Router();

route.post("/group/create", TokenValidation, creategroup);
route.post("/group/adduser", TokenValidation, () => {});
route.post("/group/join", TokenValidation, () => {});

module.exports = route;
