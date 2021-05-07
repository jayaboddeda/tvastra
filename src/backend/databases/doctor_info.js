const mongoose = require("mongoose");


const doctorInfo = new mongoose.Schema({
    describe:{
        type:String
    },
    
    hospital:{
        type:String
    },
    Achievements:{
        type:String
    },
    experience:{
        type:Number
    },
    qualification:{
        type:String
    },
    awards:{
        type:String
    },
    specialization:{
        type:String
    },
    fees:{
        type:Number
    }
})

const Doctor = new mongoose.model("Doctor",doctorInfo);

module.exports=Doctor;
