const express = require('express');
const controller = require('../controllers/pageController')


// const router = express.router();   
const router = require('express').Router();

// var { randomBytes } = require('crypto');


router.get('/', controller.home);

// router.get('*', controller.error);



module.exports =   router