const bcrypt = require("bcryptjs")
const User = require("../databases/userRegistration");
const Doctor = require("../databases/doctor_info");

const filename= require("../controller/multer");
const redirecthome = (req, res, next) => {
	
	if(req.session.useremail && req.session.user_data ){
		res.redirect('/index');
	} 
	else{
		next();
	}
}
const redirectlogin = (req, res, next) => {
	if(!req.session.useremail){
		req.flash("error", "Please Login First");
		res.redirect('/');
	} 
	else{
		next();
	}
}
 

const signUp = async (req, res) => {
	
	try{ 
		
	const finduser = await User.findOne({ email: req.body.email });
	if(finduser){
		return res.redirect("/signup")
	}
	else{
		const newUser = await User.create({
			name : req.body.name,
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
		req.session.user = req.body.name;
		req.session.user_data = newUser;
		if(newUser.role == "doctor"){
			return res.redirect("/doctor-info")
		}
		return res.redirect("/index")
		
	}
	
}
catch(err){
console.log(err)
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
			hospital_values.push(JSON.parse(hospitallist[i]).value);
		}    
	}
	if(req.body.achievements){
		for(let i = 0; i < achievementlist.length; i++){

			achievement_values.push(JSON.parse(achievementlist[i]).value);
		}    
	}
	
	if(req.body.qualifications){
		for(let i = 0; i < qualificationlist.length; i++){
			qualification_values.push(JSON.parse(qualificationlist[i]).value);
		}    
	}
	if(req.body.awards){
		for(let i = 0; i < awardslist.length; i++){
			awards_values.push(JSON.parse(awardslist[i]).value);
		}    
	}
	if(req.body.specialization){
		for(let i = 0; i < specializationlist.length; i++){
			specialization_values.push(JSON.parse(specializationlist[i]).value);
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
			email : req.session.useremail
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
	const finduser = await User.findOne({ email: req.session.useremail });
	if(finduser){
		 finduser.name = req.body.name,
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
			  const finddoctor = await Doctor.findOne({ email: req.session.useremail });
			  if(finddoctor){
				  if(req.file){
					finddoctor.image = req.file.filename
				  }
				  else{
					finddoctor.image = finddoctor.image 
				  }
				finddoctor.describe = req.body.describe,
				finddoctor.hospital=req.body.hospital,
				finddoctor.Achievements= req.body.achievements,
				finddoctor.experience= req.body.experience,
				finddoctor.qualification= req.body.qualification,
				finddoctor.awards= req.body.awards,
				finddoctor.specialization= req.body.specialization,
				finddoctor.fees = req.body.fees,
				console.log(req.body.email)
				finddoctor.email = req.body.email
				await finddoctor.save();

			  }

				 req.session.doctor_info = finddoctor;

		  }
	}
	
	 req.session.user_data = finduser;

	res.redirect("/index")
}

const emailLogin = async (req, res, next) => {

	
	if(req.body.email && req.body.password){
		
		const user = await User.findOne({ email: req.body.email });
		
		if(user){
            const isMatch = await bcrypt.compare(req.body.password,user.password)
			
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
	console.log("came : " + req.session.user_data.phone)
	const user = await User.findOne({phone:req.session.user_data.phone});
	if(user){
		req.session.change_number = true
 console.log("ccc : " + req.session.change_number);

	}
	next();
}


const checkIfUserExists = async (req, res, next) => {

	if(req.body.email){
		const user = await User.findOne({ email: req.body.email });
		
		if(user){
			req.body.phone = user.phone;
			req.session.forgetPassword = true;
      		req.session.phone = user.phone;
			next();
		} else {
			req.flash("error" , "Email Not registered");
			res.redirect('/');
		}
	} else {
		req.flash("error", "Please enter email");
		res.redirect('/');
	}
}




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
}