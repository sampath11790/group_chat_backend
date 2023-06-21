const express = require("express");
const multer = require("multer");
const Message = require("../controller/message");
const TokenValidation = require("../middleware/authentication");

const route = express.Router();

// route.post("/user/message", TokenValidation, Message.postMessage);
// route.get("/user/message", TokenValidation, Message.getMessage);

route.post("/user/message", TokenValidation, Message.postMessage);

route.post("/user/messagelist", TokenValidation, Message.getMessage);

const upload = multer();

route.post(
  "/user/file/:groupid",
  TokenValidation,
  upload.single("file"),
  Message.postFile
);

module.exports = route;
