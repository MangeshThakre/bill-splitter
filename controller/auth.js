require("dotenv").config();
const mongoose = require("../database.js");
const userModel = require("../schema/user_schema.js");
const { genPassword, validPassword } = require("../lib/passportLib.js");
const md5 = require("md5");
const nodemailer = require("nodemailer");

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

    const friendInfo = new firendsModel({
      name: firstName + " " + lastName,
      email: email,
      userId: result._id,
      friendsArr: [],
    });
    await friendInfo.save();
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

  // send otp
  static async send_otp(req, res) {
    const userEmail = req.query.userEmail;
    const otp = Math.floor(1000 + Math.random() * 9000);

    try {
      const userExist = await userModel.findOne({ email: userEmail });
      if (!userExist) {
        return res
          .status(401)
          .json({ error: userEmail + " does not have any account" });
      } else if (userExist && !userExist.source.includes("local")) {
        return res.status(401).json({
          error:
            "you have not created password for your account and hence you will not able to update password, please try to login with google",
        });
      }
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        secureConnection: false,
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      });
      // send email
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: userEmail,
        subject: "Reset password",
        html: `Hello <b>${userEmail}<b>,
                     <p>dear <b>user<b/></p>
                     ${otp} is your bull-spliter OTP, Pleas do not shere OTP as it is confidential.
                  <br>Regards,<br>
                  <br>chatapp Team<br>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) res.status(500).json({ error: error.message });
        res.status(200).json({ otp: md5(otp) });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
