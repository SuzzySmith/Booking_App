const  mongoose = require("mongoose");

const Schema = new mongoose.Schema ({
    queue_length: {
        type: Number
    },
    number_of_women: {
        type : Number
    },
    number_of_men : {
        type : String
    }


})

module.exports = mongoose.model("Logic", Schema )