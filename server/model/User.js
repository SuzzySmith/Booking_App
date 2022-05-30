const  mongoose = require("mongoose");

const Schema = new mongoose.Schema ({
    name: {
        type: String
    },
    phone_number: {
        type : String
    },

    password : {
        type : String
    },
    blocked : {
        type : Boolean,
        default : true
    },
    role : {
        type : String,
        default : 'user'
    } 
   

})

module.exports = mongoose.model("User", Schema )