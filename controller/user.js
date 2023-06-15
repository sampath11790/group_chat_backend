const bcrypt = require("bcrypt");
const User = require("../model/user");
exports.userLogin = async (req, res, next) => {
  try {
    const obj = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await User.findAll({ where: { email: obj.email } });
    if (user.length > 0) {
      //do somthing
      const isMatch = await bcrypt.compare(obj.password, user[0].password);
      if (!isMatch) {
        //reject
        throw new Error();
      } else {
        // send response
        res.status(200).json({ message: "signup successful" });
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(401).json({ error: "enter valid data" });
  }
};

exports.userSignup = (req, res, next) => {
  try {
    //creating user obj
    const obj = {
      name: req.body.name,
      email: req.body.email,
      password: "",
    };
    const salt = 10;

    //password hasing
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      if (!err) {
        obj.password = hash;
        User.create(obj)
          .then(res.status(200).json({ message: "signup successful" }))
          .catch((err) => res.status(401).json({ error: "Enter valid data" }));
      } else {
        res.status(401).json({ error: "Enter valid data" });
      }
    });
  } catch (err) {
    res.status(401).json({ error: "enter valid data" });
  }
};
