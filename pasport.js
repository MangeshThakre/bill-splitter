const userModel = require("./schema/user_schema.js");
const passport = require("passport");
const { genPassword, validPassword } = require("./lib/passportLib.js");

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//  env vairable
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
      console.log("not found");
      return done(null, {
        error: true,
        message: `That e-mail address doesn't have an associated user account.
           Are you sure you've registered?`,
      });
    }
    const isValid = validPassword(user.hash, user.salt, password);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, { error: true, message: "Invalid  password." });
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
      const firstName = profile._json.given_name;
      const lastName = profile._json.family_name;
      const email = profile._json.email;
      const profilePhoto = profile._json.picture;
      const source = "google";
      try {
        const user = await userModel.findOne({ email });
        if (user) {
          //  if user dont have profile pic and loged in with google
          if (!user.profilePhoto) {
            const updatedUser = await userModel.findOneAndUpdate(
              { email },
              { profilePhoto },
              { new: true }
            );
            return done(null, updatedUser);
          }

          return done(null, user);
        } else if (!user) {
          const saveUserInfo = new userModel({
            firstName,
            lastName,
            email,
            profilePhoto,
            source,
            created_at: new Date(),
          });
          const result = await saveUserInfo.save();
          return done(null, result);
        }
      } catch (error) {
        console.log(error);
        done(error, { status: false, message: error });
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      id: user.id,
      username: user.firstName + " " + user.lastName,
    });
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    userModel
      .findById(user.id, { hash: 0, salt: 0 })
      .then((res) => done(null, res))
      .catch((err) => done(err));
  });
});
