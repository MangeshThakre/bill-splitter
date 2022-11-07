const mongoose = require("../database.js");
const userModel = require("../schema/user_schema.js");
const { genPassword, validPassword } = require("../lib/passportLib.js");
const { findById } = require("../schema/user_schema.js");

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
      source: ["local"],
    });
    const result = await userInfo.save();
    res.status(200).json({ error: false, data: result });
  }

  static async create_password(req, res) {
    const userId = req.body.userId;
    const password = req.body.password;
    const { hash, salt } = genPassword(password);

    try {
      const result = await userModel.findByIdAndUpdate(
        userId,
        { hash, salt, source: ["local", "google"] },
        { new: true, select: { hash: 0, salt: 0 } }
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ userId, password });
    }
  }

  static async update_password(req, res) {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const userId = req.body.userId;
    try {
      const { hash, salt } = await userModel.findById(userId, {
        hash: 1,
        salt: 1,
      });
      // check the old password is valid or not
      const isValid = validPassword(hash, salt, password);
      if (!isValid) return res.status(401).json({ error: "incorret password" });
      // generate new hash and salt for new password
      const { hash: NewHash, salt: newSalt } = genPassword(newPassword);
      const result = await userModel.findByIdAndUpdate(
        userId,
        { hash: NewHash, salt: newSalt },
        { new: true, select: { hash: 0, salt: 0 } }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
