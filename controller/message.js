const Group = require("../model/group");
const Message = require("../model/message");
const User = require("../model/user");
const StoreFileAWS = require("../services/awsbucket");
exports.postMessage = async (req, res, next) => {
  try {
    const text = req.body.message;
    const groupid = req.body.groupid;

    //finding user from that group

    const userExists = await req.user.getGroups({ where: { id: groupid } });
    // console.log(userExists);
    if (!userExists.length) {
      //user is not exist in this group
      throw new Error();
    } else {
      //exist in this this group
      const message = await req.user.createMessage({
        message: text,
        groupId: groupid,
      });
      return res.status(200).json({ message: "message stored successfull" });
    }
    // const message = await req.user.createMessage({ message: text });
    // const message = await req.user.Message({
    //   message: text,
    //   groupId: groupid,
    // });
  } catch (err) {
    res.status(401).json({ error: "please join that group to send message " });
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const startMessageId = req.query.startmessageid || 0;
    let messages;
    if (startMessageId) {
      messages = await Message.findAll({
        where: { groupId: req.body.groupid, id: { [Op.gte]: startMessageId } },
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
    } else {
      messages = await Message.findAll({
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
    }

    res.status(200).json({ data: messages });
  } catch (err) {
    res.status(401).json({ error: "error", message: err });
  }
};

exports.postFile = async (req, res, next) => {
  try {
    const id = req.params;
    // const groupid = req.body.groupid;
    // const file = req.body.file;
    console.log(req);
    const { originalname, mimetype, buffer } = req.file;
    // console.log(originalname, mimetype, buffer, text);
    // const { originalname, buffer } = req.file;

    //finding user from that group

    const userExists = await req.user.getGroups({
      where: { id: Number(id.groupid) },
    });
    // console.log(userExists);
    if (!userExists.length) {
      // user is not exist in this group
      throw new Error();
    } else {
      // exist in this this group

      // store data in aws s3 bucket
      const locationurl = await StoreFileAWS(buffer, id);
      console.log(locationurl);
      // url
      const message = await req.user.createMessage({
        message: locationurl,
        groupId: Number(id.groupid),
      });
      return res
        .status(200)
        .json({ message: "message stored successfull", locationurl });
    }
  } catch (err) {
    // console.log(err);
    res.status(401).json({ error: "please join that group to send message " });
  }
};
