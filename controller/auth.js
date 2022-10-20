const mongoose = require("../database.js");
const userModel = require("../schema/user_schema.js");
const { genPassword } = require("../lib/passportLib.js");

class AuthController {
  static singIn(req, res) {
    if (!req.user.error) {
      res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        // user: req.user,
      });
    } else {
      console.log(req.message);
      res.status(200).json(req.user);
    }
  }

  static async signUp(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNo = req.body.phoneNo;
    const email = req.body.email;
    const { hash, salt } = genPassword(req.body.passWord);

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(401).json({
        error: true,
        message: "already have an account " + userExist.email,
      });
    }

    const userInfo = new userModel({
      firstName,
      lastName,
      phoneNo,
      email,
      hash,
      salt,
      source: "local",
    });
    const result = await userInfo.save();
    res.status(200).json({ error: false, data: result });
  }
}

module.exports = AuthController;
