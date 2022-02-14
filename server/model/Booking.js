const  mongoose = require("mongoose");

const Schema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref : 'User'
    },
    
    slot : {
        type : mongoose.Schema.Types.ObjectId, ref : 'Slot'
    },

    booking_date : {
        type : Date
    }


})

module.exports = mongoose.model("Booking", Schema )