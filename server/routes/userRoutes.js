const router = require("express").Router();
const req = require("express/lib/request");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const controller = require("../controllers/userController");
const User = require("../model/User");
const ExpressBrute = require("express-brute");

passport.use(
  new LocalStrategy({ passReqToCallback: true }, async function verify(
    req,
    username,
    password,
    cb
  ) {
    const user = await User.findOne({ phone_number: username });
    if (user) {
      if (user.blocked) {
        // if (user.password === password){
        return cb(null, user); // verification successful
        // }
      } else {
        return cb(null, false, {
          message: "Your account has been deactivated",
        }); // verification failed
      }
    }
    userNav(req, user);
    loginTracker(req, user);
    return cb(null, false, { message: "No user with that phone number" }); // verification failed
  })
);

const checkAuthentication = (req, res, next) => {
  res.locals.isAuthenticated = false;
  res.locals.whitelisted = false;

  if (req.path === "/") {
    res.locals.whitelisted = true;

    if (req.isAuthenticated()) {
      res.locals.isAuthenticated = true;
    }
  } else {
    if (req.isAuthenticated()) {
      res.locals.isAuthenticated = true;
    } else {
      return res.redirect("/users/login");
    }
  }
  res.locals.user = req.user || {};
  next();
};

const userNav = (req, res, next) => {
  console.log(req)
  res.locals.user = req.user || {};
  let nav = [{ href: "/", name: "Home" }];

  if (req.user) {
    if (req.user.role == "user") {
      let userNav = { href: "/bookings", name: "`bookking`" };
      nav.push(userNav);
    } else {
      let adminNav = [
        {
          href: "/booking",
          name: "Booking",
        },
        { href: "/slots", name: "Slots" },
      ];
      nav = nav.concat(adminNav);
    }
  }
  if (req.isAuthenticated()) {
    nav.push({ href: "/users/logout", name: "logout" });
  } else {
    nav.push({ href: "users/login", name: "login" });
  }
  res.locals.nav = nav;
  next();
};

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const loginTracker = async (req, user) => {
  if (!req.session.maxFailedAttempts) {
    req.session.maxFailedAttempts = 3;
  } else {
    req.session.maxFailedAttempts -= 1;

    const maxFailedAttempts = req.session.maxFailedAttempts;
    if (maxFailedAttempts <= 1) {
      user.blocked = false;
      await user.save();
    }
    console.log(req.session);
  }
  
};

// router.get("/", controller.index);
//
router.get("/users/login", controller.login);
router.get("/users/logout", controller.logout);

router.post(
  "/users/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  controller.authenticate
);
// req.flash("error")
router.use(checkAuthentication);
router.use(userNav)

//
router.get("/users/profile", controller.profile);

router.get("/users/edit/:id", controller.edit);

router.post("/users/edit/:id", controller.update);

module.exports = router;
