const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan");
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
app.use(express.static('./client'));

app.use('/css', express.static(__dirname+"client/assets/css/")); 
app.use('/js', express.static(__dirname+"client/views/js/")); 

app.use("/", htmlRoutes);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
	secret: 'TvastraApp',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		sameSite: true,
		secure: false
	}
}));
app.post("/signup",async  (req, res) =>{
  try {
    const registerUser = new Register({
      name : req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      dob: req.body.dob,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country
    })
    
    const registered = await registerUser.save();

    res.status(201).redirect("/");
      }catch(e){
    res.status(400).send(e);
  }
})

app.post("/login", async(req,res)=>{
  try{
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({email:email});
    const isMatch = await bcrypt.compare(password,useremail.password)

    if(isMatch){
      res.status(201).redirect("/")
    }else{

				res.redirect('/login');;
      }
  }
  catch(error){
    res.status(400).res.redirect('/login');
  }
})


  app.set("port", process.env.PORT || 3000);

  app.listen(app.get("port"), () => {
    console.log("Application running in port: " + app.get("port"));
  });