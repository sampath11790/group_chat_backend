const express = require("express");
const Message = require("../controller/message");
const TokenValidation = require("../middleware/authentication");

const route = express.Router();

route.post("/user/message", TokenValidation, Message.postMessage);

module.exports = route;
