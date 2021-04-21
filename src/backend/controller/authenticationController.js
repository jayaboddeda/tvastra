const bcrypt = require("bcryptjs")
const User = require("../databases/userRegistration");


const redirecthome = (req, res, next) => {
	if(req.session.useremail){
		res.redirect('/');
	} 
	else{
		next();
	}
}
const redirectlogin = (req, res, next) => {
	if(!req.session.useremail){
		res.redirect('/login');
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
		
		return res.redirect("/")
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
				console.log("2 : "+req.session.useremail)
				req.session.user = user.name;
				res.redirect('/');	
			} else{

				res.redirect('/login');	
			}
		} else {

			res.redirect('/login');
		}
	}
}

const logout = (req, res, next) => {
	req.session.destroy();
  res.redirect("/login");
}

module.exports = {

	redirecthome: redirecthome,
	redirectlogin:redirectlogin,
	signUp: signUp,
	emailLogin: emailLogin,
	logout: logout,
	
}