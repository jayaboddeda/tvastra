const User = require("../databases/userRegistration");
const Doctor = require("../databases/doctor_info");
const Slot = require("../databases/slots");
const Record = require("../databases/medicalrecords");
const moment = require("moment");

const createrecord = async(req,res,next) => {

    let arr = [];
    let i = req.files.length
	while( i > 0){
		let str = {
			img: ""
		  };
		str.img = req.files[i-1].filename;
		arr.push(str);
        i--
	}

	let date_modified  = moment(req.body.date).format("MMM D")
if(req.session.user_data.role == "admin"){
	var useremail = req.query.email
}
else{
	var useremail = req.session.user_data.email
}
    const newRecord = await Record.create({
		myfile : arr,
		title : req.body.title,
		name : req.body.name,
		date : date_modified,
		reportType : req.body.reportType,
		email:useremail
	})
	req.flash("success", "Record created");
	if(req.session.user_data.role == "admin"){
		res.redirect("/adminmedicalreports?useremail="+useremail)
	}
	res.redirect("/medicalreports")
}

const getRecordsBasedOnDoctor = async (req, res, next) => {
if(req.session.user_data.role == "admin"){
	const user = await User.find({email: req.query.useremail})
	const record = await Record.find({ email: req.query.useremail})
	
	  
		  res.render("adminmedicalreports", {
			record,
			user 
	});
} else {
	await Record.find({ email: req.session.user_data.email}).exec()
	.then((record) => {
	  console.log(req.session.user_data.email)
		  res.render("medicalreports", {
			record: record
			
		  });
		
	  
	});
}
	
}

const showReport = async(req,res,next) => {

	const report = await Record.findOne({ _id: req.query.id }).exec()
	.then((record) => {
	  if(req.session.user_data.role == "admin"){
		res.render("adminshowreports", {
			record: record
			
		  }); 
	  }else{
		  res.render("showReport", {
			record: record
			
		  });
		
		}
	});



}

const deletesinglerecord = async(req,res,next) => {

	const record = await Record.update(
		{ 
			_id: req.query.id
		 },
		 { $pull: { myfile: { _id : req.query.record_id } } },
  		{ multi: true }
		)



next()
}

const addonlyrecordimg = async(req,res,next) => {

	let arr = [];
    let i = req.files.length

	while( i > 0){
		let str = {
			img: "" 
		  };
		str.img = req.files[i-1].filename;

		arr.push(str);
        i--
	}

	const record = await Record.update(
		{ 
			_id: req.query.id
		 },
		 { $push: { myfile:  arr  } },
  		{ multi: true }
		)

next()

}

const deleterecord = async (req, res) => {
	
	await Record.findOneAndDelete({ _id: req.query.id }, (err, data) => {
	  if (!err) {
		req.flash("success", "Record deleted");
		if(req.session.user_data.role == "admin"){
		res.redirect("/adminmedicalreports?useremail="+req.query.useremail);
		}
		else{
		res.redirect("/medicalreports");
		}
	  }
	});
  };

module.exports = {
    createrecord,
    getRecordsBasedOnDoctor,
	showReport,
	deletesinglerecord,
	addonlyrecordimg,
	deleterecord
}