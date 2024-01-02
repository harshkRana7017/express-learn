const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/Schemas/User");
const { comparepasswords } = require("../Utils/helpers");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    else done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "userName",
    },
    async (userName, password, done) => {
      if (!userName || !password) {
        done(new Error("Bad request. missing credentails"), null);
      } else {
        const foundUser = await User.findOne({ userName });
        if (foundUser) {
          const isValid = comparepasswords(password, foundUser.password);
          if (isValid) {
            console.log("Authenticated Sucessfully");
            done(null, foundUser);
          } else {
            console.log("Invalid Authentication");

            done(null, null);
          }
        } else {
          console.log("User not found");
          throw new Error("User not found");
        }
      }
    }
  )
);
