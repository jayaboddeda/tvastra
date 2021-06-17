const bcrypt = require("bcryptjs")
const User = require("../databases/userRegistration");
const Doctor = require("../databases/doctor_info");
const Appointment = require("../databases/appointments_info");
const Hospital = require("../databases/hospitals");
const Slot = require("../databases/slots");
const Record = require("../databases/medicalrecords");
const moment = require("moment");



const filename= require("../controller/multer");
const { appointment } = require("./htmlController");

const index = async(req,res,next)=> {
	const hospitals = await Doctor.distinct("hospital");
	const cities = await Doctor.distinct("country");
	const treatments = await Doctor.distinct("specialization");
	const names = await Doctor.distinct("name");
	if(req.session.user_data.role == "admin"){
		res.redirect("/admindashboard");
		}
		else{
			res.render('index',{
				hospitals,
				cities,
				treatments,
				names
			})
		}
	
}

const redirecthome = (req, res, next) => {
	
	if(req.session.useremail && req.session.user_data ){
		res.redirect('/index');
	} 
	else{
		next();
	}
}

const redirectlogin = (req, res, next) => {
	if(!req.session.user_data){
		req.flash("error", "Please Login First");
		res.redirect('/');
	} else if(req.session.user_data.role=="doctor" && !req.session.doctor_info){
		req.flash("error", "Please fill the form");
		res.redirect('/doctor-info');
	}

	else{
		next();
	}
}
 

const signUp = async (req, res) => {
	
	try{ 
		
	const finduser = await User.findOne({ email: req.body.email });
	if(finduser){
		req.flash("error", "Email Exists")
		return res.redirect("/signup")
	}
	else{
		const newUser = await User.create({
			name : req.body.name.toUpperCase(),
		  email: req.body.email,
		  password: req.body.password,
		  gender: req.body.gender,
		  dob: req.body.dob,
		  phone: req.body.phone,
		  city: req.body.city,
		  state: req.body.state,
		  country: req.body.country	,
		  role:req.body.isDoctor ? "doctor" : "user"
		})	
		
		req.session.useremail= req.body.email;
		req.session.user = req.body.name.toUpperCase();
		req.session.user_data = newUser;
		if(newUser.role == "doctor"){
			return res.redirect("/doctor-info")
		}
		return res.redirect("/index")
		
	}
	
}
catch(err){
res.redirect('/signup')
}
}

const doctorInfo = async (req, res,filename) => {
	

	let hospitallist = req.body.hospital.slice(1,req.body.hospital.length-1).split(',');
	let achievementlist = req.body.achievements.slice(1,req.body.achievements.length-1).split(',');
	let qualificationlist = req.body.qualifications.slice(1,req.body.qualifications.length-1).split(',');
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
	
	if(req.body.qualifications){
		for(let i = 0; i < qualificationlist.length; i++){
			qualification_values.push(JSON.parse(qualificationlist[i]).value+ " ");
		}    
	}
	if(req.body.awards){
		for(let i = 0; i < awardslist.length; i++){
			awards_values.push(JSON.parse(awardslist[i]).value);
		}    
	}
	if(req.body.specialization){
		for(let i = 0; i < specializationlist.length; i++){
			specialization_values.push(JSON.parse(specializationlist[i]).value+ " ");
		}    
	}


	try{
		const newDoctor = await Doctor.create({
			describe : req.body.describe,
			image : req.file.filename,
			hospital:hospital_values,
			Achievements: achievement_values,
			experience: req.body.experience,
			qualification: qualification_values,
			awards: awards_values,
			specialization: specialization_values,
			fees : req.body.fees,
			email : req.session.useremail,
			name : req.session.user_data.name,
			phone : req.session.user_data.phone,
			state : req.session.user_data.state,
			country:req.session.user_data.country,
			city : req.session.user_data.city

		})
		hospital_values.forEach(async(elem,index)=>{

			const hospitalexists = await Hospital.find({name:elem})
		


			if(hospitalexists.length <= 0){
				const newHospital = await Hospital.create({
					name:elem,
					speciality : "No Info Available",
					address :"No Info Available",
					beds : "No Info Available",
					treatments : "No Info Available"
				})

			}
			
			
		})
		
		req.session.doctor_info = newDoctor;
		console.log(req.session.doctor_info);
		res.redirect("/index")	
	}
	catch(err){
		console.log(err);
		res.redirect("/doctor-info")
	}

		
}

const updateUserInfo = async(req,res) =>{

	var finduser = await User.findOne({ email: req.session.useremail });
	
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
			  const finddoctor = await Doctor.findOne({ email: req.session.user_data.email });
			//   const findappointment = await Appointment.find({ doctorEmail: req.session.useremail });
			//   const findslot = await Slot.find({ email: req.session.useremail  });
			//   const findrecord = await Record.find({ email: req.session.useremail });
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

	 req.session.doctor_info = finddoctor;

	 await Slot.updateMany({ email: req.session.user_data.email  },
		{$set:{email :req.body.email }});
  
	await Record.updateMany({ email: req.session.user_data.email  },
		{$set:{email :req.body.email, name : req.body.name.toUpperCase() }});

	await Appointment.updateMany({ doctorEmail: req.session.user_data.email  },
		{$set:{doctorEmail :req.body.email , doctorName : req.body.name.toUpperCase()}});
		  }

	}

	
		  	
	req.session.user_data = finduser;
	res.redirect("/profile")

}

const create_timeslots = async(req,res,next) => {
	const startTime = moment(req.body.startTime, "HH:mm A");
	const endTime = moment(req.body.endTime, "HH:mm A");


	let arr = [];
	while(startTime <= endTime){
		let str = {
			timing: "",
			timeOn: "off",
		  };
		 str.timing = moment(startTime).format("hh:mm A");
		arr.push(str);
		startTime.add(req.body.interval, "minutes");

	}
	if(typeof(req.body.days) == "string"){
		const newSlot = await Slot.create({
			days : req.body.days,
			slot_hospital : req.body.hospital,
			from_time : req.body.startTime,
			to_time : req.body.endTime,
			interval : req.body.interval,
			time_slots: arr,
			switch: "off",
			email:req.session.useremail
		})

	}
	else{
	while(req.body.days.length >=1){
		let i = req.body.days.length-1
		
	console.log(i)

	console.log(req.body.days[i])

	const newSlot = await Slot.create({
		days : req.body.days[i],
		slot_hospital : req.body.hospital,
		from_time : req.body.startTime,
		to_time : req.body.endTime,
		interval : req.body.interval,
		time_slots: arr,
		switch: "off",
		email:req.session.useremail
	})
	req.body.days.length--
	}
}
	req.flash("success", "schedule created");
	
	res.redirect("/schedules")	

	


}

const getSlotsBasedOnDoctor = async (req, res, next) => {
	// let dbslot = await Slot.find({ 
	// 	$and: [ 
	// 		{
	// 			email: req.session.useremail
	// 		}
	// 	]
		 
	// });
	await Slot.find({ email: req.session.user_data.email}).exec()
	.then((schedule) => {
	  
		  res.render("schedules", {
			schedule: schedule
			
		  });
		
	  
	});
	// console.log(dbslot1 )
	
	// req.session.schedule = dbslot1
	// console.log("ssss" + (req.session.schedule).length)
	// next();
}

const disableSchedule = async (req, res) => {
	await Slot.findOne({ _id: req.query.id }).then(async (user) => {
		if (user.switch == "off") {
		  await Slot.updateOne(
			{ _id: req.query.id },
			{
			  $set: {
				switch: "on",
			  },
			}
		  ).then(async () => {
			await Slot.findOne({ _id: req.query.id }, { switch: 1 }).then(
			  (el) => {
				res.status(200).redirect("/schedules");
			  }
			);
		  });
		} else {
		  await Slot.updateOne(
			{ _id: req.query.id },
			{
			  $set: {
				switch: "off",
			  },
			}
		  ).then(async () => {
			await Slot.findOne({ _id: req.query.id }, { switch: 1 }).then(
			  (el) => {
				res.status(200).redirect("/schedules");

			  }
			);
		  });
		}
	  });
  };

  const disablesingleslot = async (req,res) => {
	const findslot = await Slot.findOne(
		{
		  _id: req.query.id,
		  "time_slots._id": req.query.slot_id,
		},
		{ "time_slots.$": 1 }
	  )
	//   .then(async (user) => {
	// 	  console.log(user)
	// 	  console.log(user.time_slots[0].timeOn)

	//   });
	if(findslot){
		  console.log(findslot)

		  console.log(findslot.time_slots[0].timeOn)
		  if(findslot.time_slots[0].timeOn == "off"){
			await Slot.updateOne(
				{
					_id: req.query.id,
					"time_slots._id": req.query.slot_id,
				  },
				{
				  $set: {
					"time_slots.$.timeOn": "on",
				  },
				}
			  )

		  }
		  else{
			await Slot.updateOne(
				{
					_id: req.query.id,
					"time_slots._id": req.query.slot_id,
				  },
				{
				  $set: {
					"time_slots.$.timeOn": "off",
				  },
				}
			  )


		  }
		  res.status(200).send(findslot.time_slots[0]["timeOn"]);
	}
	}

	const deleteSchedule = async (req, res) => {
		await Slot.findOneAndDelete({ _id: req.query.id }, (err, data) => {
		  if (!err) {
			req.flash("success", "schedule deleted");
			res.redirect("/schedules");
		  }
		});
	  };

const emailLogin = async (req, res, next) => {

	
	if(req.body.email && req.body.password){
		
		const user = await User.findOne({ email: req.body.email });
		
		if(user){
            const isMatch = await bcrypt.compare(req.body.password,user.password)
			if(isMatch && user.role == "admin"){
				req.session.useremail= user.email;
				req.session.user_data = user;
			req.flash("success", "sucessfully logged in");

				res.redirect('/admindashboard')
			}	
				
			if(isMatch){
				const profile_details = await Doctor.findOne({email: user.email})
				req.session.doctor_info = profile_details
				req.session.useremail= user.email;
				req.session.user_data = user;
			req.flash("success", "sucessfully logged in");

				res.redirect('/index');	
			} else{
				req.flash("error", "invalid login details");

				res.redirect('/');	
				
			}
		} else {
			req.flash("error", "invalid login details");

			res.redirect('/');
		}
	}
	else{
		req.flash("error", "Please enter email and password");

			res.redirect('/');
	}
}

const changePassword = async (req, res) => {
	if(req.body.new_password === req.body.confirm_password){
		const user = await User.findOne({phone:req.session.phone});
		user.password = req.body.new_password;
		await user.save();
		req.session.forgetPassword = false;
		req.flash("success" , 'Password Changed Successfully');
		delete req.session.phone;
		delete req.session.user;
		res.redirect('/'); 
	} else {
		req.flash("error" , 'Passwords do not match');
		res.redirect('/changepassword');
	}
}

const change_mobile_number = async (req,res,next) => {
	// const user = await User.findOne({phone:req.session.user_data.phone});
	// if(user){
	// 	req.session.change_number = true

	// }
	// next();
	req.flash("error" , 'Cannot update Mobile number');

	res.redirect('/profile')

}


const checkIfUserExists = async (req, res, next) => {
	if(req.body.email){
		const user = await User.findOne({ email: req.body.email });

		if(user){
			req.body.phone = user.phone;
			req.session.forgetPassword = true;
      		req.session.phone = user.phone;
			next()

		} else {
			req.flash("error" , "Email Not registered");
			res.redirect('/forgotpassword');
		}
	} else {
		req.flash("error", "Please enter email");
		res.redirect('/forgotpassword');
	}
}

const postsettings = async (req, res) => {
	await User.findOne({ email: req.session.user_data.email }).then(async (u) => {
		const isMatch = await bcrypt.compare(req.body.currentPassword,u.password)
	  if (isMatch) {
		if (req.body.newPassword == req.body.confirmPassword) {
			u.password = req.body.newPassword;
			await u.save().then(() => {
			  req.flash("success","Password Changed")
			res.status(200).redirect("/profile");
		  });
		}
		else{
			req.flash("error","Passwords Does not match")
			res.redirect("/settings")
		  }
	  }
	  else{
		req.flash("error","Password incorrect")
		res.redirect("/settings")
	  }
	});
  };


const logout = (req, res) => {
	req.session.destroy();
  res.redirect("/");
}
 
module.exports = {
	redirecthome: redirecthome,
	redirectlogin:redirectlogin,
	signUp: signUp,
	emailLogin: emailLogin,
	logout: logout,
	changePassword:changePassword,
	checkIfUserExists:checkIfUserExists,
	doctorInfo,
	updateUserInfo,
	change_mobile_number,
	create_timeslots,
	getSlotsBasedOnDoctor,
	disableSchedule,
	disablesingleslot,
	deleteSchedule,
	postsettings,
	index

}