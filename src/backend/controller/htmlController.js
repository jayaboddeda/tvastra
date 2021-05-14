


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
function doctor_info(req,res){
  res.render("doctor-info")
}
  function login (req, res) {
  res.render("login");
  
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

function profile (req,res){
  res.render("profile")
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
      profile
  };