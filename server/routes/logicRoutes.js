const express = require('express');
 const controller = require('../controllers/logicController');

 const router = require('express').Router();

 router.get('/logic', controller.index);

 router.get('/logic/add', controller.index);


 router.get( '/logic/waakye_queue', controller.waakye_queue);
 
 router.post( '/logic/waakye_queue', controller.queueDecison);


 router.get( '/logic/lunch-selector', controller.lunch);

 router.post( '/logic/lunch-selector', controller.lunchDecision);


 module.exports = router