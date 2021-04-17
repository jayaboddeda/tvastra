// importing express module
const express = require("express");

// importing our controller file so as to map them to their routes
const pages = require("../controller/htmlController");

// express.Router is a middleware
// declaring express router function inside router variable
const router = express.Router();

// mapping index.html as homepage to /
router.route("/").get(pages.homePage);

// mapping aboutUs.html as response to /aboutus url
router.route("/aboutus").get(pages.aboutus);

// mapping login.html as response to /login url
router.route("/login").get(pages.login);

// mapping aboutUs.html as response to /signup url
router.route("/signup").get(pages.signup);

// exporting the router.
module.exports = router;