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
    req.session.phone = req.body.phone;
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
      if(req.session.forgetPassword){
        req.session.forgetPassword=false
          res.redirect("/changepassword")
      }
      else{
        statusCode = 200;
        req.session.dbuser = user;
        req.session.useremail = user.email;
        req.session.user = user.name;
        msg = "sucessfully logged in";
        type = "success"
        bodyMessage = "/index";
      }
      
     
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



module.exports = {
  otprequest:otprequest,
      verifyotp:verifyotp,
      
}