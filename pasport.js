const userModel = require("./schema/user_schema.js");
const passport = require("passport");
const firendsModel = require("./schema/friendsSchema.js");
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

// done is a callback which take three arguments err, user, info
// like done(err, user, info)
// passport.authenticated("local" , callback(err, user, info))
// by default if user is false then passport set  message = "unauthorised"
// for the custom messages i pass error message in user argument :)

const verifyLocalStrategy = async function (req, email, password, done) {
  try {
    const user = await userModel.findOne({ email });

    // if user does not exist show warning
    if (!user) {
      return done(null, {
        error: true,
        message: `That e-mail address doesn't have an associated user account.
           Are you sure you've registered?`,
      });

      // if user first time login with social and did not generate password and try to log in with email+password
      // show alert to login with social
    } else if (user && !user.hash && !user.salt) {
      return done(null, {
        error: true,
        message: "password does not exist please try to login with social",
      });
    }

    const isValid = validPassword(user.hash, user.salt, password);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, { error: true, message: "Invalid  password." });
    }
  } catch (error) {
    done(null, false, { message: error.message });
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
      const source = ["google"];

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

          if (!user.source.includes("google")) {
            const updatedUser = await userModel.findOneAndUpdate(
              { email },

              { source: ["local ,google"] },
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

          const friendInfo = new firendsModel({
            name: firstName + " " + lastName,
            email: email,
            userId: result._id,
            friendsArr: [],
          });
          await friendInfo.save();
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
