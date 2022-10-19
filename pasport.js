const userModel = require("./schema/user_schema.js");
const passport = require("passport");
const { genPassword, validPassword } = require("./lib/passportLib.js");

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//  Emv vairable
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// local stertegy
const customfield = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};
const verifyLocalStrategy = async function (req, email, password, done) {
  try {
    const user = await userModel.findOne({
      email,
      // phoneNo: req.body.phoneNo,
    });
    if (!user) {
      return done(null, false, {
        message: `That e-mail address or mobile doesn't have an associated user account.
           Are you sure you've registered?`,
      });
    }
    const isValid = validPassword(user.hash, user.salt, password);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Invalid username and password." });
    }
  } catch (error) {
    done(null, false, { message: err });
  }
};

const locStrategy = new LocalStrategy(customfield, verifyLocalStrategy);
passport.use(locStrategy);

// Google startegy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const _id = profile._json.sub;
      const firstName = profile._json.givenName;
      const email = profile._json.email;
      const lastName = profile._json.familyName;
      const profilePhoto = profile._json.picture;
      const source = "google";
      try {
        const user = await userModel.findOne({ email });
        if (user) {
          return done(null, { status: true, data: user });
        } else if (!user) {
          const saveUserInfo = new userModel({
            _id,
            firstName,
            lastName,
            email,
            profilePhoto,
            source,
            created_at: new Date(),
          });
          const result = await saveUserInfo.save();
          return done(null, { status: true, data: result });
        }
      } catch (error) {
        console.log(error);
        done(err, { status: false, message: err });
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.firstName + " " + user.lastName });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
