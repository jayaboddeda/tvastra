const mongoose = require("mongoose");

const time = new mongoose.Schema({
    timing: { type: String },
    timeOn: { type: String },
  });
  
 

const slots = new mongoose.Schema({
    email:{
        type:String
    },
    days:{
        type:String
    },
    slot_hospital:{
        type:String
    },
    from_time:{
        type:String
    },
    to_time:{
        type:String
    },
    interval:{
        type:Number
    },
    time_slots:[time],
    switch: {
        type: String
        
      }
})

const Time_slots = new mongoose.model("Slot",slots);

module.exports=Time_slots;
