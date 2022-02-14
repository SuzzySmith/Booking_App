const router = require('express').Router();

const Booking = require('../model/Booking');
const Slot = require('../model/slot');
const User = require('../model/User');


exports.index = async (req, res) => {
    const slots = await Slot.find({});
    res.render('slot/index', {title: "Slot", slots})
     
}

exports.add = async (req, res) => {
    res.render('slot/add', {title: "Add Slot"})
     
} 

exports.save = async (req, res) => {
    const slot = new Slot ({
        slot_date: req.body.slot_date,
        quantity: req.body.quantity
    })

  await slot.save()
// console.log(r)


  


    res.render('slot/add', {title: "Add Slot"})
     
}

