const bcrypt = require("bcrypt");
const User = require("../model/user");
exports.userLogin = (req, res, next) => {
  try {
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
