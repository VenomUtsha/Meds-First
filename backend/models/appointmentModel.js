const mongoose = require("mongoose")


const appointmentModelSchema = new mongoose.Schema({

    userId:{
        type:String,
    },
    name:{
        type:String,
    },
    service:{
        type:String,
    },      
    schedule:{
        type:String,
        default:0
    },
    date:{
        type:String
    }
});

module.exports = mongoose.model("appointmentModel",appointmentModelSchema);