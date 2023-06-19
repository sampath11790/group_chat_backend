const jwt = require("jsonwebtoken");
const User = require("../model/user");
const TokenValidation = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // console.log("token",token)
    //vefify token
    const response = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    //finding user data and adding in to request object
    const Userdata = await User.findByPk(response.userId);
    if (Userdata) {
      req.user = Userdata;
      next();
    }
  } catch (err) {
    res.status(401).json({
      error: "yor are not authorized to acceess this page",
    });
  }
};
module.exports = TokenValidation;
