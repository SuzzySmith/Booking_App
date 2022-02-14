const router = require('express').Router();
const passport = require('passport');
const passportLocal = require('passport-local');
const controller = require('../controllers/userController')

// passport.use(
//     new LocalStrategy(function verify(name, password, cb){
//         const user = {}
//         return cb(null, user);
//         // let user = {
//         //     id: 101,
//         //     name: 'Valentine',
//         //     username: '',
//         // }
//     })
// )

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user)
});

passport.deserializeUser(function (user, cb) {
    return cb(null, user)
});


router.get('/', controller.index);
//
router.get('/users/login', controller.login);

router.post('/users/login', controller.authenticate);

//
router.get('/users/profile', controller.profile);


router.get('/users/edit/:id', controller.edit);

router.post('/users/edit/:id', controller.update);


module.exports =   router