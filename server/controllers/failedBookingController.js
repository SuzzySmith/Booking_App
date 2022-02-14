
const router = require('express').Router();
const FailedBooking = require('../model/FailedBooking');



exports.index = async (req, res) => {
    const failedBooking = await FailedBooking.find()
    res.render('failedBooking/index', {title: "Failed Booking", failedBooking})
     
}
