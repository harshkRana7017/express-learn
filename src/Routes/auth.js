const { Router } = require("express");
const User = require("../database/Schemas/User");
const { hashpassword, comparepasswords } = require("../Utils/helpers");
const router = new Router();
const passport = require("passport");
router.get("", (req, res) => {});

// router.post("/login", async (req, res) => {
//   const { userName, password } = req.body;
//   if (userName && password) {
// if (req.session.user) {
//   res.send("You are already logged in ");
// } else {
//   req.session.user = {
//     userName,
//   };
//   res.send(req.session.user);
// }
//     const user = await User.findOne({ userName });
//     const passwordMatch = comparepasswords(password, user.password);
//     if (user && passwordMatch) {
//       req.session.user = user;
//       res.send("you are now logged in");
//     } else {
//       res.status(401).send("wrong password");
//       // res;
//     }
//   } else {
//     res.sendStatus(401);
//   }
// });

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("logged in");
  res.sendStatus(200);
});

router.post("/register", async (req, res) => {
  const { userName, email } = req.body;
  const userDB = await User.findOne({ $or: [{ userName }, { email }] });
  if (userDB) {
    res.sendStatus(400);
  } else {
    const password = hashpassword(req.body.password);
    const newUser = await User.create({ userName, password, email });
    res.sendStatus(201);
  }
});

module.exports = router;
