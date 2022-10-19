const mongoose = require("../database.js");
const userModel = require("../schema/user_schema.js");

class controller {
  static singin(req, res) {
    res.json({ status: "success" });
  }

  static async signup(req, res) {
    const passWord = req.body.passWord;
    const phoneNo = req.body.phoneNo;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(401).json({
        error: true,
        message: "already login with " + userExist.source,
      });
    }
    const userInfo = new userModel({
      passWord,
      phoneNo,
      email,
      firstName,
      lastName,
      source: "local",
    });
    const result = await userInfo.save();
    res.status(200).json({ error: false, data: result });
  }
}

module.exports = controller;
