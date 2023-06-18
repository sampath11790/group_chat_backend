const Message = require("../model/message");
const User = require("../model/user");

exports.postMessage = async (req, res, next) => {
  try {
    const text = req.body.message;
    const groupid = req.body.groupid;
    // const message = await req.user.createMessage({ message: text });
    const message = await req.user.createMessage({
      message: text,
      groupId: groupid,
    });
    res.status(200).json({ message: "message stored successfull" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "error", message: err });
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: { groupId: req.body.groupid },
      attributes: {
        exclude: ["userId", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({ data: messages });
  } catch (err) {
    res.status(401).json({ error: "error", message: err });
  }
};
