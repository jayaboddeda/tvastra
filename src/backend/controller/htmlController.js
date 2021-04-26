const OtpManager = require("../nexmo-otp/src/OtpManager");
const otpRepository = require("../nexmo-otp/src/otpRepository");
const otpSender = require("../nexmo-otp/src/otpSender")
const otpManager = new OtpManager(otpRepository, {otpLength: 4, validityTime: 5});
const User = require("../databases/userRegistration");
var token
const otprequest= async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });
  if(user){
    token = req.body.phone;
  }
  else{
    req.flash("error", "Mobile Number not exist");
    res.redirect("/phone-login");
  }
  
  const otp = otpManager.create(token);
  otpSender.send(otp, req.body);
  res.redirect("/otp-submit");
 }; 

 const verifyotp = async (req, res) =>{
  const user = await User.findOne({ phone: token });
  
 const inp1 = req.body.otp1;
 const inp2 = req.body.otp2;
 const inp3 = req.body.otp3;
 const inp4 = req.body.otp4;
 const code = inp1+inp2+inp3+inp4;

  const verificationResults = otpManager.VerificationResults;
  const verificationResult = otpManager.verify(token,code);
  let statusCode;
  let bodyMessage;
  let msg;
  let type;

  switch (verificationResult) {
    case verificationResults.valid:
      statusCode = 200;
      req.session.dbuser = user;
      req.session.useremail = user.email;
      req.session.user = user.name;
      msg = "sucessfully logged in";
      type = "success"
      bodyMessage = "/index";

      break;
    case verificationResults.notValid:
      statusCode = 404;
      msg = "Invalid OTP"
      type = "error"
      bodyMessage = "/otp-submit";

      break;
    case verificationResults.checked:
      statusCode = 409;
      msg = "The code has already been verified";
      type = "error"
      bodyMessage = "/otp-submit";

      break;
    case verificationResults.expired:
      statusCode = 410;
      msg = "The code is expired";
      type = "error"
      bodyMessage = "/otp-submit";

      break;
    default:
      statusCode = 404;
      msg = "The code is invalid for unknown reason";
      type = "error"
      bodyMessage = "/otp-submit";

}
req.flash(type,msg)
res.status(statusCode).redirect(bodyMessage);

  
};


function homePage (req, res) {
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

  function login (req, res) {
  res.render("login")
  };

  function phone_login (req, res) {
  res.render("phone-login")
  };
  function otp_submit (req, res) {
  res.render("otp-submit")
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
      otprequest:otprequest,
      verifyotp:verifyotp

  };