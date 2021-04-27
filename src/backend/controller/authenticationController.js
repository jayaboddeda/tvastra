const bcrypt = require("bcryptjs")
const User = require("../databases/userRegistration");


const redirecthome = (req, res, next) => {
	
	if(req.session.useremail && req.session.user ){
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
		req.session.email = req.body.email;
	req.session.user = req.body.name;
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
		  country: req.body.country	
		})	
		console.log(req.body.email)
		
		return res.redirect("/index")
	}
	
}
catch(err){
console.log(err)
res.redirect('/signup')
}
}

const emailLogin = async (req, res, next) => {

	
	if(req.body.email && req.body.password){
		
		const user = await User.findOne({ email: req.body.email });
		
		if(user){
            const isMatch = await bcrypt.compare(req.body.password,user.password)
			
			if(isMatch){
				req.session.useremail= user.email;

				req.session.user = user.name;
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

const checkIfUserExists = async (req, res, next) => {
	if(req.body.email){
		const user = await User.findOne({ email: req.body.email });
		if(user){
			req.body.phone = user.phone;
			req.session.forgetPassword = true;
      		req.session.phone = user.phone
			next();
		} else {
			req.flash("error",'Email Not registered');
			res.redirect('/');
		}
	} else {
		req.flash("error",'Email Not registered');
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
	checkIfUserExists:checkIfUserExists
	
}