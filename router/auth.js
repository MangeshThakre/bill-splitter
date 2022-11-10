require("dotenv").config();
const router = require("express").Router();
const { authenticate } = require("passport");

const passport = require("passport");
const authcontroller = require("../controller/auth.js");
require("../pasport.js");

// login success ?
router.get("/login/success", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "you are not Authenticated" });
  }
});

// logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ error: false, message: "successfuly logout" });
});

///////////////////////////////////////////////////
// SIGN-IN

// local-statergy
router.post("/signin", passport.authenticate("local"), authcontroller.singIn);

// google-statergy
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: process.env.APP_URL,
  }),

  authcontroller.singIn
);

// SIGN-UP
router.post("/singup", authcontroller.signUp);

// createpass
router.post("/create_password", authcontroller.create_password);
// update password
router.post("/update_password", authcontroller.update_password);

router.get("/send_otp", authcontroller.send_otp);

module.exports = router;
