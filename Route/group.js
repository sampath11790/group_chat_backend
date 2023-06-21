const express = require("express");

const TokenValidation = require("../middleware/authentication");
const {
  deletegroup,
  getgroups,
  getgroupusers,
  creategroup,
  adduser,
  deleteMember,
  updateAdmin,
} = require("../controller/group");

const route = express.Router();
route.get("/group", TokenValidation, getgroups);

route.post("/group/groupuser", TokenValidation, getgroupusers);
route.post("/group/create", TokenValidation, creategroup);
route.post("/group/user", TokenValidation, adduser);
route.post("/group/join", TokenValidation, () => {});
route.delete("/group", TokenValidation, deletegroup);
route.delete("/group/user", TokenValidation, deleteMember);
route.patch("/group/updateAdmin", TokenValidation, updateAdmin);

module.exports = route;
