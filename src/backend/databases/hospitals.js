const mongoose = require("mongoose");


const hospitals = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    speciality:{
        type:Array
    },
    beds:{
        type:Number
    },
    address:{
        type:String
    },
    treatments:{
        type:String
    }
})

const Hospital = new mongoose.model("Hospital",hospitals);

module.exports=Hospital;