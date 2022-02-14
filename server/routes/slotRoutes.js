const express = require('express');
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});
const controller = require('../controllers/slotController')

// const router = express.router();   
const router = require('express').Router();


router.get('/slots', controller.index);


router.get('/slots/add', csrfProtection, controller.add);

router.post('/slots/add', csrfProtection, controller.save);


module.exports =   router