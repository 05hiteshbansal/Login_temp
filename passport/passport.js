const passport = require("passport");
const User = require("../model/user");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK
    },
    (accessToken, refreshToken, Profile, next) => {
      // callback
      console.log("My Profile", Profile._json.email);
      User.findOne({ email: Profile._json.email })
        .then((user) => {
          console.log(1);
          if (user) {
            console.log("user already exist", user);
            //cookie token
            next(null, user);
          } else {
            User.create({
              name: Profile.displayName,
              googleId: Profile.id,
              email: Profile._json.email,
            })
              .then((user) => {
                console.log(user, "user is created");
                // cookie token
                next(null, user);
              })
              .catch(console.log("there is some error "));
          }
        })
        .catch(console.log("there is some error 2 "));
        console.log(2);
    }
  )
);
