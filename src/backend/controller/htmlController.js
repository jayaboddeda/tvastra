// htmlController.js

// importing path module.
const path = require("path");

// serving home page for response

let homePage = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/index.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let doctor = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/doctor.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let hospital = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/hospital.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let signup = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/signup.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let login = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/login.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let aboutus = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/aboutus.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let about_hospital = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/about-hospital.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let doctor_profile = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/doctor-profile.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let appointment = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/appointment.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let contactus = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/contactus.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let faq = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/faq.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let submit_your_query = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/submit-your-query.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let treatment = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/treatment.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
  };

  let tvastra_plus = (req, res) => {
    // defining path to our index.html file as it is or homepage file.
    let pathToHtml = path.join(__dirname, "../../client/views/tvastra-plus.html");
    // sending index.html as a response
    res.sendFile(pathToHtml);
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
      tvastra_plus:tvastra_plus

  };