const router = require("express").Router();
const passport = require("passport");
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/auth/login');
  });
})

router.get(
  "/google",
  passport.authenticate("google", {
    // data we are bringing
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("login with google");
  }
);

router.get(
  "/google/callback",
  passport.authenticate(
    "google"
    // enable it for fail login
    ,{ failureRedirect: "/auth/login" }
  ),
  (req, res) => {
   res.redirect('/')
  }
);

module.exports = router;
