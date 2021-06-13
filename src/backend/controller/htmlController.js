


function homePage (req, res) {
  if(req.session.user_data.role == "admin"){
  res.redirect("/admindashboard");
  }
  res.render("index");
}

  function doctor (req, res){
    res.render("doctor")
  };

  function hospital (req, res) {

    res.render("hospital");
  };
  function signup (req, res){

    res.render("signup");
  };
function doctor_info(req,res){
  res.render("doctor-info")
}
  function login (req, res) {
  res.render("login");
  };
  function forgotpassword (req, res) {
  res.render("forgotpassword");
  };

  function phone_login (req, res) {
  res.render("phone-login")
  };
  function otp_submit (req, res) {
  res.render("otp-submit")
  };

  function changepassword (req, res) {
  res.render("changepassword")
  };

  function aboutus (req, res)  {

    res.render("aboutus");
  };

  function about_hospital (req, res) {
    res.render("about-hospital");
  };

  function doctor_profile (req, res) {

  
    res.render("doctor-profile");
  };

  function appointment  (req, res) {

    res.render("appointment");
  };

  function contactus (req, res)  {
  
    res.render("contactus");
  };

  function faq  (req, res)  {
 
    res.render("faq");
  };

  function submit_your_query (req, res)  {

    res.render("submit-your-query");
  };

  function treatment  (req, res)  {

    res.render("treatment");
  };

  function tvastra_plus  (req, res) {

    res.render("tvastra-plus");
  };

  function booking  (req, res) {

    res.render("booking");
  };

  function bookappointment  (req, res) {

    res.render("bookappointment");
  };

function profile (req,res){
  res.render("profile")
}

function schedules (req,res){
  res.render("schedules")
}

function medicalreports (req,res){
  res.render("medicalreports")
}
function rescheduleappointment (req,res){
  res.render("rescheduleappointment")
}

function myappointments (req,res){
  res.render("myappointments")
}
function settings (req,res){
  res.render("settings")
}

function admindashboard (req,res){
  res.render("admindashboard")
}

function alldoctors (req,res){
  res.render("alldoctors")
}
function allhospitals (req,res){
  res.render("allhospitals")
}
function allusers (req,res){
  res.render("allusers")
}
function allhospitals (req,res){
  res.render("allhospitals")
}
function admineditprofile (req,res){
  res.render("admineditprofile")
}
function adminmyappointments (req,res){
  res.render("adminmyappointments")
}
function adminmedicalreports (req,res){
  res.render("adminmedicalreports")
}
function adminallappointments (req,res){
  res.render("adminallappointments")
}
function adminVerifyHospital (req,res){
  res.render("adminVerifyHospital")
}

  module.exports = {
      homePage:homePage,
      doctor:doctor,
      hospital:hospital,
      login:login,
      phone_login:phone_login,
      otp_submit:otp_submit,
      signup:signup,
      about_hospital:about_hospital,
      aboutus:aboutus,
      appointment:appointment,
      contactus:contactus,
      doctor_profile:doctor_profile,
      submit_your_query:submit_your_query,
      treatment:treatment,
      tvastra_plus:tvastra_plus,
      faq:faq,
      changepassword:changepassword,
      doctor_info,
      profile,
      schedules,
      medicalreports,
      booking,
      bookappointment,
      rescheduleappointment,
      myappointments,
      settings,
      admindashboard,
      allhospitals,
      alldoctors,
      allusers,
      admineditprofile,
      adminmyappointments,
      adminmedicalreports,
      adminallappointments,
      allhospitals,
      adminVerifyHospital,
      forgotpassword
  };