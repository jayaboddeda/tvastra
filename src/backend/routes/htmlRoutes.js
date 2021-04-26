const express = require("express");
const htmlController = require("../controller/htmlController");
const authenticationController = require("../controller/authenticationController");
const otpController = require("../controller/otpController");
const router = express.Router();
const app = express();

router.route("/index").get(authenticationController.redirectlogin,htmlController.homePage);

router.route("/aboutus").get(authenticationController.redirectlogin,htmlController.aboutus);

router.route("/").get( authenticationController.redirecthome,htmlController.login );
router.route("/").post(  authenticationController.emailLogin);

router.route("/phone-login").get(htmlController.phone_login)

router.route("/otp-submit").get(htmlController.otp_submit)

router.route("/signup").get(authenticationController.redirecthome, htmlController.signup);
router.route("/signup").post( authenticationController.signUp);

router.route("/phone-login").post(htmlController.otprequest);
router.route("/otp-submit").post(htmlController.verifyotp);

router.route("/doctor").get(authenticationController.redirectlogin,htmlController.doctor);

router.route("/hospital").get(authenticationController.redirectlogin,htmlController.hospital);

router.route("/about-hospital").get(authenticationController.redirectlogin,htmlController.about_hospital);

router.route("/appointment").get(authenticationController.redirectlogin,htmlController.appointment);

router.route("/contactus").get(authenticationController.redirectlogin,htmlController.contactus);

router.route("/doctor-profile").get(authenticationController.redirectlogin,htmlController.doctor_profile);

router.route("/submit-your-query").get(authenticationController.redirectlogin,htmlController.submit_your_query);

router.route("/treatment").get(authenticationController.redirectlogin,htmlController.treatment);

router.route("/faq").get(authenticationController.redirectlogin,htmlController.faq);

router.route("/tvastra-plus").get(authenticationController.redirectlogin,htmlController.tvastra_plus);

router.route("/logout").get(authenticationController.logout);

module.exports = router;