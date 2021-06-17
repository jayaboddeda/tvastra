const express = require("express");
const htmlController = require("../controller/htmlController");
const authenticationController = require("../controller/authenticationController");
const otpController = require("../controller/otpController");
const recordsController = require("../controller/recordsController");
const doctorController = require("../controller/doctorController");
const adminController = require("../controller/adminController");



const multer = require("../controller/multer");
const { adminallappointments } = require("../controller/htmlController");

const router = express.Router();
const app = express();

router.route("/index").get(authenticationController.redirectlogin,authenticationController.index);

router.route("/indexSearch").post(doctorController.indexSearch);

router.route("/aboutus").get(authenticationController.redirectlogin,htmlController.aboutus);

router.route("/").get( authenticationController.redirecthome,htmlController.login );
router.route("/forgotpassword").get(htmlController.forgotpassword);

router.route("/").post(  authenticationController.emailLogin);

router.route("/phone-login").get(htmlController.phone_login)

router.route("/otp-submit").get(htmlController.otp_submit)

router.route("/signup").get(authenticationController.redirecthome, htmlController.signup);
router.route("/signup").post( authenticationController.signUp);

router.route("/doctor-info").get(htmlController.doctor_info);
router.route("/doctor-info").post(multer.uploadDocImg,authenticationController.doctorInfo);


router.route("/phone-login").post(otpController.otprequest);
router.route("/otp-submit").post(otpController.verifyotp);
router.route("/forgotpassword").post(authenticationController.checkIfUserExists,otpController.otprequest);
router.route("/resend").post(otpController.otprequest)
router.route("/changepassword").get(htmlController.changepassword);
router.route("/changepassword").post(authenticationController.changePassword);

router.get("/fetchtimeslots", doctorController.fetchtimeslots);

router.route("/doctor").get(authenticationController.redirectlogin,doctorController.getAllDoctors);
router.get("/booking", doctorController.booking);
router.post("/bookappointment", doctorController.bookappointment);
router.get("/booking", doctorController.booking);
router.get("/bookappointment", htmlController.bookappointment);
router.get("/cancelappointment", doctorController.cancelappointment);
router.get("/rescheduleappointment", doctorController.rescheduleappointment);
router.get("/updateappointment", doctorController.updateappointment);
router.get("/myappointments", doctorController.getappointments);
router.post('/sort-by', doctorController.doctorSort);









router.route("/hospital").get(authenticationController.redirectlogin,htmlController.hospital);

router.route("/about-hospital").get(authenticationController.redirectlogin,htmlController.about_hospital);

router.route("/appointment").get(authenticationController.redirectlogin,htmlController.appointment);

router.route("/contactus").get(authenticationController.redirectlogin,htmlController.contactus);

router.route("/profile").get(authenticationController.redirectlogin,htmlController.profile);
router.route("/updateprofile").post(multer.uploadDocImg,authenticationController.updateUserInfo);

router.route("/schedules").get(authenticationController.getSlotsBasedOnDoctor);
router.route("/create_timeslots").post(authenticationController.create_timeslots);
router.route("/disableSchedule").get(authenticationController.disableSchedule);
router.route("/disablesingleslot").get(authenticationController.disablesingleslot);
router.route("/deleteSchedule").get(authenticationController.deleteSchedule);

router.route("/medicalreports").get(recordsController.getRecordsBasedOnDoctor);
router.route("/showReport").get(recordsController.showReport);
router.route("/deletesinglerecord").get(recordsController.deletesinglerecord,recordsController.showReport);
router.route("/deleterecord").get(recordsController.deleterecord);

router.route("/createrecord").post(multer.uploadmultipleImg,recordsController.createrecord);
router.route("/addonlyrecordimg").post(multer.uploadmultipleImg,recordsController.addonlyrecordimg,recordsController.showReport);


router.route("/change-phone-number").post(authenticationController.change_mobile_number,otpController.otprequest);
router.route("/verify-otp").post(authenticationController.change_mobile_number,otpController.verifyotp);
router.route("/change_number_resend").post(authenticationController.change_mobile_number,otpController.otprequest);


router.route("/doctor-profile").get(authenticationController.redirectlogin,htmlController.doctor_profile);

router.route("/submit-your-query").get(authenticationController.redirectlogin,htmlController.submit_your_query);

router.route("/treatment").get(authenticationController.redirectlogin,htmlController.treatment);

router.route("/faq").get(authenticationController.redirectlogin,htmlController.faq);

router.route("/tvastra-plus").get(authenticationController.redirectlogin,htmlController.tvastra_plus);

router.route("/logout").get(authenticationController.logout);
router.route("/settings").get(htmlController.settings);
router.route("/postsettings").post(authenticationController.postsettings);

router.route("/admindashboard").get(adminController.admindashboard);
router.route("/adminVerifyHospital").get(adminController.adminverifyhospital);
router.route("/hospitalupdate").post(multer.uploadDocImg,adminController.hospitalupdate);
router.route("/alldoctors").get(adminController.admindoctors);
router.route("/allusers").get(adminController.adminusers);
router.route("/allhospitals").get(adminController.adminhospitals);
router.route("/adminEditProfile").get(adminController.adminEditProfile);
router.route("/adminupdateprofile").post(multer.uploadDocImg,adminController.adminupdateUserInfo);
router.get("/adminmyappointments", doctorController.getappointments);
router.get("/adminmedicalreports", recordsController.getRecordsBasedOnDoctor);
router.get("/adminallappointments", adminController.adminallappointments);
router.post("/filters", doctorController.filters);






module.exports = router;