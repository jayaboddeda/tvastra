const mongoose = require("mongoose");


const appointmentInfo = new mongoose.Schema({
   doctorId:{
       type:String
   },
   doctorEmail:{
       type:String
   },
   doctorName:{
       type:String
   },
   doctorAvtar:{
       type:String
   },
   doctorHospitals:{
       type:String
   },
   doctorQualifications:{
       type:String
   },
   slotId:{
       type:String
   },
   scheduleId:{
       type:String
   },
   hospital:{
       type:String
   },
   date:{
       type:String
   },
   startTime:{
       type:String
   },
   endTime:{
       type:String
   },
   isFor:{
       type:String
   },
   patientName:{
       type:String
   },
   mobile:{
       type:String
   },
   user:{
       type:String
   },
   patientMobile:{
       type:String
   },
   patientEmail:{
       type:String
   }
   

})

const  Appointments = new mongoose.model("Appointments",appointmentInfo);

module.exports=Appointments;
