const express = require("express");
const htmlController = require("../controller/htmlController");
const router = express.Router();
const app = express();

router.route("/").get(htmlController.homePage);

router.route("/aboutus").get(htmlController.aboutus);

router.route("/login").get(htmlController.login);

router.route("/signup").get(htmlController.signup);

router.route("/doctor").get(htmlController.doctor);

router.route("/hospital").get(htmlController.hospital);

router.route("/about-hospital").get(htmlController.about_hospital);

router.route("/appointment").get(htmlController.appointment);

router.route("/contactus").get(htmlController.contactus);

router.route("/doctor-profile").get(htmlController.doctor_profile);

router.route("/submit-your-query").get(htmlController.submit_your_query);

router.route("/treatment").get(htmlController.treatment);

router.route("/faq").get(htmlController.faq);

router.route("/tvastra-plus").get(htmlController.tvastra_plus);

module.exports = router;