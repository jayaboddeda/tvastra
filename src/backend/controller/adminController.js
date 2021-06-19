const bcrypt = require("bcryptjs")
const User = require("../databases/userRegistration");
const Doctor = require("../databases/doctor_info");
const Slot = require("../databases/slots");
const moment = require("moment");
const Record = require("../databases/medicalrecords");
const Appointment = require("../databases/appointments_info");
const Hospital = require("../databases/hospitals");

const { admineditprofile } = require("./htmlController");

const admindashboard = async(req,res)=>{
    let { page, size } = req.query;

  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 3;
  }

  const limit = parseInt(size);
  const skip = (page - 1) * size;

    let users = await User.find({role:'user'})
    let doctors = await Doctor.find({})
    let hospitals = await Hospital.find({})
    let totalappointments = await Appointment.find({})
    let appointments = await User.find({role:'user'}).limit(limit).skip(skip)

res.render("admindashboard",{
    users,
    doctors,
    hospitals,
    appointments,
    page,
    totalappointments
})
}

const adminusers = async (req,res)=>{
    let users = await User.find({role:'user'})
    res.render("allusers",{
        users
    })
}
const adminhospitals = async (req,res)=>{
    let hospitals = await Hospital.find()
    res.render("allhospitals",{
        hospitals
    })
}
const admindoctors = async (req,res)=>{
    let users = await Doctor.find({})
    res.render("alldoctors",{
        users
    })
}

const adminEditProfile = async (req,res) =>{
let user_info = await User.find({email : req.query.email})

if(user_info[0].role =="doctor"){
let doctor_info = await Doctor.find({email : user_info[0].email})
res.render("admineditprofile",{
    user_info,
    doctor_info
})
}
else{ 
    res.render("admineditprofile",{
        user_info
    })
}


}

const adminupdateUserInfo = async(req,res) =>{
    
	

	const finduser = await User.findOne({ email: req.query.useremail });
    console.log(finduser)
	if(finduser){
		 finduser.name = req.body.name.toUpperCase(),
		  finduser.email= req.body.email,
		  finduser.gender = req.body.gender,
		  finduser.dob = req.body.dob,
		  finduser.phone = req.body.phone,
		  finduser.city = req.body.city,
		  finduser.state = req.body.state,
		  finduser.country = req.body.country,
		  finduser.timezone = req.body.timezone,
		  finduser.line1 = req.body.address_line1,
		  finduser.line2 = req.body.address_line2


		  if(req.file){
			  finduser.image = req.file.filename
		  }

		  await finduser.save();
		  if(finduser.role=="doctor"){
            let hospitallist = req.body.hospital.slice(1,req.body.hospital.length-1).split(',');
            let achievementlist = req.body.achievements.slice(1,req.body.achievements.length-1).split(',');
            let qualificationlist = req.body.qualification.slice(1,req.body.qualification.length-1).split(',');
            let awardslist = req.body.awards.slice(1,req.body.awards.length-1).split(',');
            let specializationlist = req.body.specialization.slice(1,req.body.specialization.length-1).split(',');
        
            let hospital_values = [];
            let achievement_values = [];
            let qualification_values = [];
        
            let awards_values = [];
            let specialization_values = [];
        
            if(req.body.hospital){
                for(let i = 0; i < hospitallist.length; i++){
                    hospital_values.push(JSON.parse(hospitallist[i]).value+ " ");
                }    
            }
            if(req.body.achievements){
                for(let i = 0; i < achievementlist.length; i++){
        
                    achievement_values.push(JSON.parse(achievementlist[i]).value+ " ");
                }    
            }
            
            if(req.body.qualification){
                for(let i = 0; i < qualificationlist.length; i++){
                    qualification_values.push(JSON.parse(qualificationlist[i]).value + " ");
                }    
            }
            if(req.body.awards){
                for(let i = 0; i < awardslist.length; i++){
                    awards_values.push(JSON.parse(awardslist[i]).value+ " ");
                }    
            }
            if(req.body.specialization){
                for(let i = 0; i < specializationlist.length; i++){
                    specialization_values.push(JSON.parse(specializationlist[i]).value+ " ");
                }    
            }
			  const finddoctor = await Doctor.findOne({ email: req.query.useremail });
			  if(finddoctor){
				  if(req.file){
					finddoctor.image = req.file.filename
				  }
				  else{
					finddoctor.image = finddoctor.image 
				  }
				finddoctor.describe = req.body.describe,
				finddoctor.hospital=hospital_values,
				finddoctor.Achievements= achievement_values,
				finddoctor.experience= req.body.experience,
				finddoctor.qualification= qualification_values,
				finddoctor.awards= awards_values,
				finddoctor.specialization= specialization_values,
				finddoctor.fees = req.body.fees,
				finddoctor.email = req.body.email
                finddoctor.name = req.body.name.toUpperCase()
                finddoctor.phone= req.body.phone
				await finddoctor.save();

			  }


		  }
	}
	
    if(finduser.role=="doctor"){
        let st = await Slot.find({email: req.query.useremail})
        if(st){
            await Slot.updateMany({ email: req.query.useremail  },
                {$set:{email :req.body.email}});
        }

  let rec = await Record.find({email: req.query.useremail})
  if(rec){
    await Record.updateMany({ email: req.query.useremail  },
		{$set:{email :req.body.email, name : req.body.name.toUpperCase() }});
  }
	
let app = await Appointment.find({ doctorEmail: req.query.useremail  })
if(app){
    await Appointment.updateMany({ doctorEmail: req.query.useremail  },
		{$set:{doctorEmail :req.body.email , doctorName : req.body.name.toUpperCase()}});
}
	
		  
        res.redirect("/alldoctors")

    }
    else{
        let rec = await Record.find({ email: req.query.useremail  })

        if(rec){
        await Record.updateMany({ email: req.query.useremail  },
            {$set:{email :req.body.email, name : req.body.name.toUpperCase() }});
    
        }   
        
        let app =	await Appointment.find({ patientEmail: req.query.useremail,isFor:'self'  });
    if(app){
        for(let i =0; i< app.length;i++){
    
            app[i].patientName = req.body.name.toUpperCase()
    app[i].patientEmail =  req.body.email
        
        
            await app[i].save()
            }
    }
        
        res.redirect("/allusers")

    }
}

const adminallappointments = async (req,res)=>{
    const appointments = await Appointment.find({doctorEmail : req.query.email})
    const doctor =  await User.findOne({email : req.query.email})
    const doctorname = doctor.name
    res.render("adminallappointments",{
        appointments,
        doctorname
    })
}

const adminverifyhospital = async(req,res)=>{
    const hospital = await Hospital.findOne({_id:req.query.id})
    res.render("adminVerifyHospital",{
        hospital
    })
}

const hospitalupdate = async(req,res)=>{
    const hospital = await Hospital.findOne({_id:req.query.id})
    hospital.name = req.body.hospitalname 
    hospital.description = req.body.describe
    hospital.speciality = req.body.speciality ? req.body.speciality : "No Info available"
    hospital.beds = req.body.beds ? req.body.beds : 0
    hospital.address = req.body.address ? req.body.address : "No Info available"
    hospital.treatments = req.body.treatment ? req.body.treatment : "No Info available"
    if(req.file){
        hospital.image = req.file.filename

    }

    await hospital.save()
    res.redirect("/adminVerifyHospital?id="+req.query.id)

}
module.exports = {
    adminusers,
    adminEditProfile,
    adminupdateUserInfo,
    admindoctors,
    adminallappointments,
    adminhospitals,
    adminverifyhospital,
    hospitalupdate,
    admindashboard
}