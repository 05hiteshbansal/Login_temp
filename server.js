const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
const auth = require("./routes/routes");
require("./passport/passport");
//const cookieSession = require("cookie-session");
const passport = require("passport");
const session = require('express-session')


mongoose.connect(
  process.env.URL
);
try {
  console.log("DB connected");
} catch (error) {
  console.log(error);
}




//passport.initialize()
const app = express();
//app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false , maxAge: 3*24*60*60*100 }
 }));
 app.use(passport.initialize());
 app.use(passport.session())

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }else{
    next()
  }
};

app.set("view engine", "ejs");

app.get("/", isLoggedIn, (req, res) => {
  res.render("home");
});
app.use("/auth",auth);

app.listen(4000, () => {
  console.log("server.is running ");
});
