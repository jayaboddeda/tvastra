
function homePage (req, res) {
  var val = req.session.user;
  res.render("index",{user: val});
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

  };