const router = require('express').Router();

const User = require('../model/User');

exports.index = async (req, res) => {
  
    res.render('users/index', {title: "Users"})
     
}

exports.index = async (req, res) => {
  
    res.render('users/index', {title: "Users"})
     
}

exports.edit = async (req, res) => {
    let id = req.params.user_id 
    // console.log(id)
       const user = await User.findById(id);
    res.render('user/edit', {title: "Users", user})
     
}

exports.update = async (req, res) => {
    let id = req.params.user_id 

    const user = await User.updateOne({_id: id},
      {client_name:req.body.client_name,
      phone_number : req.body.phone_number,
      })
    res.render('user/edit', {title: "Users"})
     
}