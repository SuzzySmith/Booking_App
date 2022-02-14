const express = require('express');
const controller = require('../controllers/userController')

// const router = express.router();   
const router = require('express').Router();


router.get('/', controller.index);


router.get('/users/edit/:id', controller.edit);

router.post('/users/edit/:id', controller.update);


module.exports =   router