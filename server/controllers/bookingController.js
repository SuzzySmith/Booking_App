const router = require("express").Router();
const req = require("express/lib/request");
const Booking = require("../model/Booking");
const FailedBooking = require("../model/FailedBooking");
const Slot = require("../model/slot");
const User = require("../model/User");


// const bookingPerUser = (bookings) => {
//   let display = ''
//   let id = req.params.user._id 
//     // console.log(id)
//        const user =  User.findById(id);
//   if (bookings) {
//     bookings.forEach((booking, index) => {
//       if (user != booking.user._id) {
//       console.log(booking.user.name)
//       console.log(booking.slot.slot_date)
//       user = booking.user._id;
//       } else {
//         console.log(booking.slot.slot_date)
//       }
//     });  
//   }else {
//       displayBooking = 'Sorry no bookings'
//   }
//   return display
// };

exports.index = async (req, res) => {
  const bookings = await Booking.find({})
  .populate(['user', 'slot'])
  .sort({ user: -1, slot: 1})


  // let displayBooking = bookingPerUser(bookings);
 
  res.render("booking/index", { title: "Booking", bookings});
};

exports.add = async (req, res) => {
  const slots = await Slot.find({});
  res.render("booking/add", { title: "Booking", slots });
};

exports.save = async (req, res) => {
  //confirming if user is saved in the db
  let user = await User.findOne({
    phone_number: req.body.phone_number,
  });

  if (!user) {
    user = new User({
      name: "",
      phone_number: req.body.phone_number,
    });
    await user.save();
  }

  const booking_date = req.body.slot_date;
  const next_date = new Date(booking_date);

  next_date.setDate(next_date.getDate() + 1);

  const slot = await Slot.findOne({
    slot_date: {
      $gte: new Date(booking_date),
      $lt: new Date(next_date),
    },
    quantity: {
      $gt: 0,
    },
  });

  if (slot) {
    const booking = new Booking({
      user: user._id,
      slot: slot._id,
    });
    await booking.save();

    //    res.render( {success: 'Booking saved successfully'})
    const quantity = slot.quantity - 1;
    let reduce_quantity = await Slot.updateOne(
      { _id: slot._id },
      { quantity: quantity }
    );

    if (!user.name) {
      res.render("booking/update_user", { title: "Update User", user });
    } else {
      res.render("booking/index");
    } await user.save

  } else {
    const failedBooking = new FailedBooking({
      user: user._id,
      booking_date: booking_date,
    });
    await failedBooking.save();
    res.render("booking/add", {
      title: "Update User",
      message: "Sorry booking not saved",
    });
  }
};

// exports.edit = async (req, res) => {

//     // console.log(user)

//      res.render('booking/edit', {title: "Booking", user})

//  }

exports.update = async (req, res) => {
  let phone_number = req.body.phone_number;

  const user = await User.findOne({ phone_number: phone_number });
  if (user) {
    user.name = req.body.name;
    user.password = req.body.password;
    await user.save();
  }else{

  }
  console.log(req.body)

  res.render("booking/feedback", { title: "Booking"});
};
