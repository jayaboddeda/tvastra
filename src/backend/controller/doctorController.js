const User = require("../databases/userRegistration");
const Doctor = require("../databases/doctor_info");
const Slot = require("../databases/slots");
const Record = require("../databases/medicalrecords");
const Appointment = require("../databases/appointments_info");
const Hospital = require("../databases/hospitals");

var moment = require("moment");
const { default: App } = require("nexmo/lib/App");
const { hospital } = require("./htmlController");

const indexSearch = async (req,res,next)=>{

   const hospitals = await Doctor.distinct("hospital");
   const cities = await Doctor.distinct("country");
   const treatments = await Doctor.distinct("qualification");
   const names = await Doctor.distinct("name");
   const namesl = names.map(v => v.toLowerCase())

   if(hospitals.includes(req.body.hospital)){
     if(req.body.city){
      req.session.filter = {
        city:[req.body.city],
        hospital:[req.body.hospital]
      }
     }
     else{
      req.session.filter = {
        hospital:[req.body.hospital]
      }
    }
   
   }else if(treatments.includes(req.body.hospital)){
    if(req.body.city){
      req.session.filter = {
        city:[req.body.city],
        treatment:[req.body.hospital]
      }
      
     }
     else{
    req.session.filter = {
      treatment:[req.body.hospital]
    }
  }
   }
   else if(namesl.indexOf(req.body.hospital.toLowerCase())>-1){
    if(req.body.city){
      req.session.filter = {
        city:[req.body.city],
        names:[req.body.hospital]
      }
      
     }
     else{
    req.session.filter = {
      names:[req.body.hospital]
    }
  }
   }
   else{
    req.session.filter = {
      city:[req.body.city]
    }
   }

res.redirect('/doctor')

}

const getAllDoctors = async (req, res, next) => {
  let { page, size } = req.query;

  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 3;
  }

  const limit = parseInt(size);
  const skip = (page - 1) * size;
if(req.session.filter){
 if(Array.isArray(req.session.filter.exp)){
  req.session.filter.exp = 0
  }
}
  if(req.session.sortBy){
    if(req.session.sortBy == "experience"){
    var mysort = { experience: -1 };
    }
    if(req.session.sortBy == "experience-asc"){
    var mysort = { experience: 1 };
    }
    if(req.session.sortBy == "fees-asc"){
    var mysort = { fees: 1 };
    }
    if(req.session.sortBy == "fees-desc"){
    var mysort = { fees: -1 };
    }
    if(req.session.sortBy == "name-asc"){
    var mysort = { name: 1 };
    }
    if(req.session.sortBy == "name-desc"){
    var mysort = { name: -1 };
    }
	// var doctors = await Doctor.find({ }).sort(mysort).limit(limit).skip(skip)
   }
if(req.session.filter){
 if(req.session.filter.city && req.session.filter.hospital && req.session.filter.treatment &&  req.session.filter.exp){
    var doctors = await Doctor.find({
      $and:[
        {country:{$in : req.session.filter.city}},
        {hospital:{$in : req.session.filter.hospital}},
        {qualification:{$in : req.session.filter.treatment}},
        {experience:{$gte : parseInt(req.session.filter.exp)}}
      ]
    }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip)

    var count = await Doctor.find({
      $and:[
        {country:{$in : req.session.filter.city}},
        {hospital:{$in : req.session.filter.hospital}},
        {qualification:{$in : req.session.filter.treatment}},
        {experience:{$gte : parseInt(req.session.filter.exp)}}
      ]
    }).countDocuments({ })
   }
   else if( req.session.filter.hospital &&  req.session.filter.exp){
    var doctors = await Doctor.find({
      $and:[
       
        {hospital:{$in : req.session.filter.hospital}},
        {experience:{$gte : parseInt(req.session.filter.exp)}}
      ]
    }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip)
    var count = await Doctor.find({
      $and:[
       
        {hospital:{$in : req.session.filter.hospital}},
        {experience:{$gte : parseInt(req.session.filter.exp)}}
      ]
    }).countDocuments({ })
   }
   else if(req.session.filter.city &&  req.session.filter.treatment ){
    var doctors = await Doctor.find({
      $and:[
        {country:{$in : req.session.filter.city}},
        {qualification:{$in : req.session.filter.treatment}},
      ]
    }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip)
    var count = await Doctor.find({
      $and:[
        {country:{$in : req.session.filter.city}},
        {qualification:{$in : req.session.filter.treatment}},
      ]
    }).countDocuments({ })
   }
   else if(req.session.filter.city &&  req.session.filter.exp){
    var doctors = await Doctor.find({
      $and:[
        {country:{$in : req.session.filter.city}},
        {experience:{$gte : parseInt(req.session.filter.exp)}}
      ]
    }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip)

    var count = await Doctor.find({
      $and:[
        {country:{$in : req.session.filter.city}},
        {experience:{$gte : parseInt(req.session.filter.exp)}}
      ]
    }).countDocuments({ })

   }
   else if(req.session.filter.hospital && req.session.filter.treatment){
    var doctors = await Doctor.find({
      $and:[
        
        {hospital:{$in : req.session.filter.hospital}},
        {qualification:{$in : req.session.filter.treatment}}
      ]
    }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip)

    var count = await Doctor.find({
      $and:[
        
        {hospital:{$in : req.session.filter.hospital}},
        {qualification:{$in : req.session.filter.treatment}}
      ]
    }).countDocuments({ })

   }
   else if(req.session.filter.city && req.session.filter.hospital){
    var doctors = await Doctor.find({
      $and:[
        {country:{$in : req.session.filter.city}},
        {hospital:{$in : req.session.filter.hospital}}
      ]
    }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip)
    var count = await Doctor.find({
      $and:[
        {country:{$in : req.session.filter.city}},
        {hospital:{$in : req.session.filter.hospital}}
      ]
    }).countDocuments({ })
   }
   else if(req.session.filter.treatment &&  req.session.filter.exp){
    var doctors = await Doctor.find({
      $and:[
        {qualification:{$in : req.session.filter.treatment}},
        {experience:{$gte : parseInt(req.session.filter.exp)}}
      ]
    }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip)
    var count = await Doctor.find({
      $and:[
        {qualification:{$in : req.session.filter.treatment}},
        {experience:{$gte : parseInt(req.session.filter.exp)}}
      ]
    }).countDocuments({ })
   }
   else if(req.session.filter.names && !req.session.filter.city){
    var doctors = await Doctor.find({
        name:{$regex:req.session.filter.names[0] ,$options:"$i"}
    }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip)
  }
  else if(req.session.filter.names && req.session.filter.city){
    var doctors = await Doctor.find({
      $and:[
        {name:{$regex:req.session.filter.names[0] ,$options:"$i"}},
        {country:{$in : req.session.filter.city}}
      ]      
    }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip)
console.log('aaa'+ doctors)

  }
   else if(req.session.filter.city || req.session.filter.hospital || req.session.filter.treatment ||  req.session.filter.exp ){
    console.log(typeof(req.session.filter.exp))

    var doctors = await Doctor.find({
      $or:[
        {country:{$in : req.session.filter.city}},
        {hospital:{$in : req.session.filter.hospital}},
        {qualification:{$in : req.session.filter.treatment}},
        {experience:{$gte : req.session.filter.exp}}
      ]
    }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip)
    var count = await Doctor.find({
      
      $or:[
        {country:{$in : req.session.filter.city}},
        {hospital:{$in : req.session.filter.hospital}},
        {qualification:{$in : req.session.filter.treatment}},
        {experience:{$gte : req.session.filter.exp}}
      ]
    }).countDocuments({ })
     }
  
  
  }

   else{
	var doctors = await Doctor.find({ }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip).exec()
  var count = await Doctor.find({ }).countDocuments({ })
   
}


   
   const hospitals = await Doctor.distinct("hospital");
   const cities = await Doctor.distinct("country");
   const treatments = await Doctor.distinct("qualification");

    let user_info_arr = []
    let slot_info_arr = []
if(doctors){

for(let i = 0; i<doctors.length; i++){
    await User.find({email:doctors[i].email }).exec().then((user)=>{
        user_info_arr.push(user)
    })
    var slot_info = await Slot.find({email:doctors[i].email }).exec()
    slot_info_arr.push(slot_info)
} 
  
}
else{
  var doctors = await Doctor.find({ }).sort(req.session.sortBy ? mysort : []).limit(limit).skip(skip).exec()
  var count = await Doctor.find({ }).countDocuments({ })

  for(let i = 0; i<doctors.length; i++){
    await User.find({email:doctors[i].email }).exec().then((user)=>{
        user_info_arr.push(user)
    })
    var slot_info = await Slot.find({email:doctors[i].email }).exec()
    slot_info_arr.push(slot_info)
  }
}
res.render("doctor", {
    doctors,
    user_info_arr,
    slot_info_arr,
    page,
    count,
    hospitals,
    cities,
    treatments
  });
	
}

const filters = (req,res) => {
if(Object.keys(req.body).length >0){
  req.session.filter = req.body
}
else{
  delete req.session.filter
}
  res.redirect('/doctor');
}

const doctorSort =async (req, res) => {
  req.session.sortBy = req.body.sort;

console.log(req.session.sortBy)
 res.redirect('/doctor')
}

const fetchtimeslots = async (req, res) => {
    await Slot.find(
      { email: req.query.doctorname, switch: "off" },
      { days: 1, time_slots: 1 }
    ).exec((err, user) => {
  

      res.status(200).send(user);
    });
  };

  const booking = async (req, res) => {
    const userrole = await User.findOne({email:req.session.user_data.email })
    console.log(userrole.role)

    if(userrole.role == "doctor"){
      console.log(userrole.role)
      req.flash("error","Doctor cannot make appointment")
      res.redirect("/doctor")
    }
    else{
    const booking_info = {
      dayslot: req.query.dayslot,
      timeslot : req.query.timeslot,
      time : req.query.time,
      date : req.query.date,
      doctoremail : req.query.doctorname,
    }

    const user = await User.findOne({email:req.query.doctorname })
    const doctor = await Doctor.findOne({email:booking_info.doctoremail })
    const slot = await Slot.findOne({_id:booking_info.dayslot })

for(let i =0; i<slot.time_slots.length; i++){
if(booking_info.timeslot == slot.time_slots[i]._id){
  var from_time = slot.time_slots[i].timing
  // var to_time = slot.time_slots[i+1].timing
	const fromtime = moment(from_time, "HH:mm A");
  var to_time = fromtime.add(slot.interval,"minutes").format("hh:mm A");
  console.log(to_time)


}
}

    res.render("booking",{
      booking_info,
      doctor,
      user,
      to_time
    })
  }
  }

  const bookappointment = async(req,res)=>{

    const newappointment = await Appointment.create({
 
     doctorId : req.body.doctorId,
     doctorEmail : req.body.doctorEmail,
     doctorName : req.body.doctorName,
     doctorAvtar : req.body.doctorAvtar,
     doctorHospitals : req.body.doctorHospitals,
     doctorQualifications : req.body.doctorQualifications,
     slotId : req.body.slotId,
     scheduleId : req.body.scheduleId,
     hospital : req.body.hospital,
     date : req.body.date,
     startTime : req.body.startTime,
     endTime : req.body.endTime,
     isFor : req.body.isFor,
     patientName : req.body.name,
     mobile : req.body.mobile,
     patientMobile : req.body.patientMobile,
     patientEmail : req.body.email,
     user: req.session.user_data.name
 
    })

    const slot = await Slot.updateOne(
      {_id: req.body.scheduleId, "time_slots._id":req.body.slotId },
      { $set: { "time_slots.$.timeOn" : "on" } }
    )
  

    req.session.appointmentinfo = newappointment
 res.redirect("/bookappointment")
 }

 const cancelappointment = async(req,res)=>{
 
  await Slot.updateOne(
    {_id: req.query.scheduleId, "time_slots._id":req.query.slotId },
    { $set: { "time_slots.$.timeOn" : "off" } }
  )
  await Appointment.findOneAndDelete({_id : req.query.appointmentId})
req.flash("success", "Appointment Canceled")
  res.redirect("/myappointments")

 }

 const rescheduleappointment = async(req,res)=>{
 const appointmentinfo = await Appointment.findOne({_id : req.query.appointmentId})

 res.render("rescheduleappointment",{
   appointmentinfo
 })
}
const updateappointment = async(req,res)=>{

  const appointmentinfo = await Appointment.findOne({_id : req.query.appointmentid})
  await Slot.updateOne(
    {_id: appointmentinfo.scheduleId, "time_slots._id":appointmentinfo.slotId },
    { $set: { "time_slots.$.timeOn" : "off" } }
  )
  

  appointmentinfo.slotId = req.query.timeslot
  

  appointmentinfo.date = req.query.date
  
  appointmentinfo.scheduleId = req.query.dayslot

  appointmentinfo.startTime = req.query.time
  await appointmentinfo.save();
  

  
   await Slot.updateOne(
    {_id: req.query.dayslot, "time_slots._id":req.query.timeslot },
    { $set: { "time_slots.$.timeOn" : "on" } }
  )

  req.flash("success", "Appointment Rescheduled")
  if(req.session.user_data.role =="admin"){
    res.redirect("/adminmyappointments?mobile="+ appointmentinfo.mobile)
  }
  else{
  res.redirect("/myappointments")
  }
}

const getappointments = async(req,res)=>{
  if(req.session.user_data.role =="admin"){
    if(req.query.mobile){
      var appointments = await Appointment.find({mobile : req.query.mobile})
      res.render("adminmyappointments",{
        appointments,
        moment
      })
    }
  else if(req.query.email){
    var appointments = await Appointment.find({doctorEmail : req.query.email})
    res.render("adminmyappointments",{
      appointments,
      moment
    })
  }
  }else if(req.session.user_data.role =="doctor"){
    var appointments = await Appointment.find({doctorEmail : req.session.user_data.email})
    res.render("myappointments",{
      appointments,
      moment
    })
  }
  else{
  var appointments = await Appointment.find({mobile : req.session.user_data.phone})
  res.render("myappointments",{
    appointments,
    moment
  })
  }
  
}
module.exports = {
    getAllDoctors,
    fetchtimeslots,
    booking,
    bookappointment,
    cancelappointment,
    rescheduleappointment,
    updateappointment,
    getappointments,
    doctorSort,
    filters,
    indexSearch
  }