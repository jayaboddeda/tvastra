const mongoose = require("mongoose");


const doctorInfo = new mongoose.Schema({
    describe:{
        type:String
    },
    image:{
        type:String
    },
    hospital:{
        type:Array
    },
    Achievements:{
        type:Array
    },
    experience:{
        type:Number
    },
    qualification:{
        type:Array
    },
    awards:{
        type:Array
    },
    specialization:{
        type:Array
    },
    fees:{
        type:Number
    },
    email:{
        type:String
    }
})

const Doctor = new mongoose.model("Doctor",doctorInfo);

module.exports=Doctor;
