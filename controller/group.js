const User = require("../model/user");

exports.creategroup = async (req, res, next) => {
  try {
    // console.log("creategroup");
    const group = await req.user.createGroup(
      { name: req.body.name },
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
