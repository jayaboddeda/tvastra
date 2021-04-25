const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan");
const flash         = require("connect-flash")
const path = require("path");
const bcrypt = require("bcryptjs")
const htmlRoutes = require("./backend/routes/htmlRoutes");
const session = require('express-session');
require ("./backend/databases/sqlite")
const Register = require("./backend/databases/userRegistration");
const { ppid } = require("process");
const { STATES } = require("mongoose");
app.use(cors());  

app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set("views", __dirname + "/client/views");

app.engine("html", require("ejs").renderFile); 
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, '/client')));

app.use('/css', express.static(__dirname+"client/assets/css/")); 
app.use('/js', express.static(__dirname+"client/views/js/")); 


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
	cookie: { path: "/", maxAge: 1000 * 60 * 60 * 24 },
	secret: "KonfinitySecretKey",
	saveUninitialized: false,
	resave: false
  }));

  app.use(flash());

  app.use( (req, res, next) => {
    res.locals.name = req.session.user;
    res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
    next();
  });
  app.use("/", htmlRoutes);
  app.set("port", process.env.PORT || 3000);

  app.listen(app.get("port"), () => {
    console.log("Application running in port: " + app.get("port"));
  });

  module.exports = app;
	  
