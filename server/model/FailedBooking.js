const  mongoose = require("mongoose");

const Schema = new mongoose.Schema ({
    client_name: {
        type: String
    },
    phone_number: {
        type : String
    },
    booking_date : {
        type : Date
    }


})

module.exports = mongoose.model("FailedBooking", Schema )