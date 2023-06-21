const Group = require("../model/group");
const Message = require("../model/message");
const User = require("../model/user");
const sequelize = require("../utli/database");
exports.getgroups = async (req, res, next) => {
  try {
    const group = await req.user.getGroups();
    res.status(200).json({
      data: group,
    });
  } catch (err) {
    res.status(401).json({ error: "no group found" });
  }
};

exports.getgroupusers = async (req, res, next) => {
  try {
    const groupid = req.body.groupid;
    const group = await req.user.getGroups({ where: { id: groupid } });
    const users = await group[0].getUsers();
    // console.log(users);
    res.status(200).json({
      data: users,
    });
  } catch (err) {
    // console.log(err);
    res.status(401).json({ error: "no group found" });
  }
};

exports.creategroup = async (req, res, next) => {
  try {
    // console.log("creategroup");
    const group = await req.user.createGroup(
      { name: req.body.groupname },
      { through: { admin: true } }
    );
    res.status(200).json({ message: "group created  successfull" });
  } catch (err) {
    res.status(401).json({ error: "this group is already exist " });
  }
};

exports.adduser = async (req, res, next) => {
  try {
    // console.log("creategroup");
    const groupid = req.body.groupid;

    // Fetch group and user information
    const groupmember = await User.findAll({
      where: { email: req.body.email },
    });
    const group = await req.user.getGroups({ where: { id: groupid } });
    // console.log(group);

    // Check if the group and user exists
    if (!groupmember.length || !group.length) {
      return res.status(404).json({ message: "User or group not found" });
    }

    // Add the user to the group
    await group[0].addUser(groupmember[0], { through: { admin: false } });

    res.status(200).json({ message: "member successfully added in group" });
  } catch (err) {
    // console.log(err);
    res.status(401).json({ error: "error ", message: err });
  }
};

exports.deleteMember = async (req, res, next) => {
  try {
    //need data ,member name and group id,
    const groupid = req.body.groupid;
    const memberemail = req.body.email;

    // Fetch group and user information
    const groupmember = await User.findAll({
      where: { email: memberemail },
    });
    const group = await req.user.getGroups({ where: { id: groupid } });

    // Check if the group and user exists
    if (!groupmember.length || !group.length) {
      return res.status(404).json({ message: "User or group not found" });
    }

    const user = groupmember[0];
    const groupInstance = group[0];
    //delete that user group messsage
    // const message = await Message.destroy({
    //   where: {
    //     userId: user.id,
    //     groupId: groupInstance.id,
    //   },
    // });

    // remove the user from the group
    // if (message.length) {
    //   await message.destroy();
    // }
    await groupInstance.removeUser(user);

    res.status(200).json({
      message: "User removed from the group and messages deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "user or group not found " });
  }
};

exports.updateAdmin = async (req, res, next) => {
  try {
    // const userExists = await Group.findOne({
    //   where: { id: req.body.groupid },
    //   include: [{ model: User, where: { email: req.body.email } }],
    // });
    // console.log(userExists.users[0].grouplist.admin);
    // if (!userExists.length) {
    //   //user is not exist in this group
    //   throw new Error();
    // } else {
    //   //exist in this this group
    //   userExists[0].grouplist.update({ admin: true });
    // }
    res.status(200).json({ message: "admin updated  successfull" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "error " });
  }
};

exports.deletegroup = async (req, res, next) => {
  // Start a transaction
  const t = await sequelize.transaction();
  try {
    //need data ,member name and group id,
    const groupid = req.body.groupid;

    // Fetch group  information

    const group = await req.user.getGroups({ where: { id: groupid } });

    // Check if the group and user exists
    if (!group.length) {
      return res.status(404).json({ message: "User or group not found" });
    }

    const groupInstance = group[0];
    // delete that user group messsage
    const message = await Message.destroy({
      where: { groupId: groupInstance.id },
      transaction: t,
    });
    // Delete the group instance
    await groupInstance.destroy({ transaction: t });

    await t.commit();

    res.status(200).json({
      message: "User removed from the group and messages deleted successfully",
    });
  } catch (err) {
    await t.rollback();
    // console.log(err);
    res.status(401).json({ error: "user or group not found " });
  }
};
