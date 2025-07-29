const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/userschema");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Try finding the user by googleId
        let user = await User.findOne({ googleId: profile.id });

        // 2. If not found by googleId, try finding by email
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // Link this user to Google ID (preserve dateJoined)
            user.googleId = profile.id;
            await user.save();
          } else {
            // Create a brand new user
            user = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              dateJoined: new Date(), // Optional; schema default handles it too
            });
          }
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Session handling
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
