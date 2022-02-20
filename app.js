const express = require('express'); 
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8059
// const passport = require('passport');
// const passportLocal = require('passport-local');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')

require("./server/model/AppModel")

//static files middleware for communication
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.urlencoded({extended:true}));
app.use(flash())
app.use(session({
    secret: process.env.SECRET,
    resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))




//setting Templating engine
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


const route = require('./server/routes/pageRoutes')
const booking = require('./server/routes/bookingRoutes')
const failedBooking = require('./server/routes/failedBookingRoutes')
const slot = require('./server/routes/slotRoutes')
const logic= require('./server/routes/logicRoutes')
const user = require('./server/routes/userRoutes');

//CSRF 

const csrf = require('csurf');
const csrfProtection = csrf({ cookie: false})

const csrfCheck = function (req,res, next){
  csrfProtection(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      res.locals.csrfToken = req.csrfToken();
      next();
    };
  });
};

app.use(csrfCheck)

//routes
app.use('/', user);
app.use('/', route);
app.use('/', booking);
app.use('/', failedBooking);
app.use('/', slot);
app.use('/', logic);


app.use('*', (req,res) => {
  res.render('error/index', { root: __dirname, title : 'Error'})
})

app.use((error, req, res, next) => {
  res.render('error/errors', {
    title: '500: Internal Server Error',
    status: error.status || 500,
    error: error,
  });
});




app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})