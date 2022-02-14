
const router = require('express').Router();

const Logic = require('../model/logic')





exports.index = async (req, res) => {
  
    const navigations = [ 
        {
            name: 'Waakye_Queue',
            path: "/logic/waakye_queue",
            description: "At waakye joint, i was told to move to joint 2, if the queue is long and if there is more women i should move to joint 3",
            date: '26/01/22'
            },

        {
            

            name: 'Lunch-selector',
            path : '/logic/lunch-selector',
            description:  'You can eat Banku or Jollof for lunch. You will go for jollof if you took porridge or milo for breakfast. If you ate Kenkey for breakfast, then you will skip lunch. however you will eat Banku if you skipped breakfast',
            date: '02/02/2022'
        }    
    ]
    res.render('logic/index', {title: "logic", navigations})
     
}

exports.waakye_queue = async (req, res) => {
    res.render('logic/add', {title: " Add Logic"})
     
}

exports.waakye_queue = async (req, res) => {
    res.render('logic/waakye_queue', {title: "Logic"})
     
}

exports.queueDecison = async (req, res) => {

    const logic = new Logic ({
        queue_length : req.body.queue_length,
        number_of_women : req.body.number_of_women,
        number_of_men : req.body.number_of_men

    })
    await menu.save()
    
    res.render('logic/waakye_queue', {title: "Logic"})
     
}

exports.lunch = async (req, res) => {
    let decision = ''
    res.render('logic/lunch', {title : 'lunch', decision})
     
}
/**
 * 
 * You can eat Banku or Jollof for lunch. You will go for jollof if you took porridge or milo for breakfast. If you ate Kenkey for breakfast, then you will skip lunch. however you will eat Banku if you skipped breakfast
 * @param {*} breakfast 
 * @returns lunch 
 */
const lunchSelector = (breakfast) => {
    let lunch = 'no-lunch';
        if (breakfast == 'milo' || breakfast == 'porridge') {
            lunch = 'You are eating Jollof';
        } else if (breakfast == 'kenkey'){
            lunch = 'You will skip lunch';
        } else {
            lunch = 'You are eating banku'
        } 
        return lunch;      
}

exports.lunchDecision = async (req, res) => {
    const breakfast = req.body.breakfast;
    let decision = lunchSelector(breakfast)
    
    res.render('logic/lunch', {title : 'lunch', decision})
     
}



























//     if (useSwitch) {
//         console.log('I am using switch')
//         switch (breakfast) {
//             case 'milo' || 'porridge':
//                 console.log('no lunch')
//                 break;
//             case 'kenkey':
//                 console.log('no lunch')
//                 break;
//             default: 
//             console.log('Banku')

            
//         }
//     } else {