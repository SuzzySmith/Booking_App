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
    }
   

})

module.exports = mongoose.model("User", Schema )