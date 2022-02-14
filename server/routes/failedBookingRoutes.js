
const express = require('express');
const controller = require('../controllers/failedBookingController');

const router = require('express').Router();

router.get('/failedbookings', controller.index);


module.exports = router