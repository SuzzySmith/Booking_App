const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const controller = require("../controllers/userController");

const User = require("../model/User");
passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await User.findOne({ phone_number: username });
console.log(user)
    if (user) {
      // if (user.password === password){
      return cb(null, user); // verification successful
      // }
    }
    return cb(null, false); // verification failed
  })
);

 const checkAuthentication = (req, res, next) => {
//   res.locals.isAuthenticated = false;
   if (req.isAuthenticated()) {
    //  res.locals.isAuthenticated = true;
     next();
    } 
    else {
     res.redirect("/users/login" );
  }
 };

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

router.get("/", controller.index);
//
router.get("/users/login", controller.login);

router.post(
  "/users/login",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  controller.authenticate
);

router.use(checkAuthentication);

//
router.get("/users/profile", controller.profile);

router.get("/users/edit/:id", controller.edit);

router.post("/users/edit/:id", controller.update);

module.exports = router;
