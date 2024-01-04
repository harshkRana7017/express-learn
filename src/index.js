require("dotenv").config();

const express = require("express");
const parser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
require("./database/index");
require("./Stratergies/local");
//Routes
const grocRoute = require("./Routes/gorceries");
const marketRoute = require("./Routes/markets");
const authenticationRoute = require("./Routes/auth");
const monogoStore = require("connect-mongo");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(parser());
app.use(
  session({
    secret: "harshrana7017",
    resave: false,
    saveUninitialized: false,
    //way to create a session store in mongo db, now even after the restarting of the server, the sessio id works
    store: monogoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/test" }),
  })
);

//paspport is initalised, it then registers a lcoal stratergy for authentication we add the logic in passport.use we then import it in index.js and add the aunthentication startergy in the path with which we want to authenticate , after doing this, we then register a serialise and a decerialise funtion , whoch are reposindible for setting a session id so that the client has cookies to send for every http request that the client sends
//the isue is this every time the server restarts, the session id is lost and we again have to login therefore for this we'll lerarn something as session stores

//pasport middleware

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authenticationRoute);

app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.use("/api/groceries", grocRoute);
app.use("/api/markets", marketRoute);

app.listen(process.env.PORT, () => {
  console.log(`running express server on port number ${process.env.PORT}`);
});
