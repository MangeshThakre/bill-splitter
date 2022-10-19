const router = require("express").Router();
const passport = require("passport");
const authcontroller = require("../controller/auth.js");
require("../pasport.js");

router.get("/login/success", (req, res) => {
  console.log(req.user);
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

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

///////////////////////////////////////////////////

// SIGN-IN

// local-statergy
router.post("/signin", passport.authenticate("local"), authcontroller.singIn);

// google-statergy
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google"),
  authcontroller.singIn
);

// SIGN-UP
router.post("/singup", authcontroller.signUp);

module.exports = router;
