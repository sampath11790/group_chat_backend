exports.creategroup = (req, res, next) => {
  try {
    // console.log("creategroup");
    const group = req.user.createGroup(
      { name: req.body.name },
      { through: { admin: true } }
    );
    res.status(200).json({ message: "group created  successfull" });
  } catch (err) {
    res.status(401).json({ error: "this group is already exist " });
  }
};
