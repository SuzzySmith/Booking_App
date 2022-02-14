const express = require('express');
 const controller = require('../controllers/bookingController');

 const router = require('express').Router();

 router.get('/bookings', controller.index);

 router.get('/bookings/add', controller.add);
 
 router.post('/bookings/add', controller.save);


 //updating uer info
//  router.get('/bookings/edit', controller.edit);
 
 router.post('/bookings/update', controller.update);


 module.exports = router