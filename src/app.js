const express = require("express");
const router = express.Router();
const app = express();
const logger = require("morgan");
const path = require("path");

app.set("views", __dirname + "/client/views");

app.engine("html", require("ejs").renderFile); 
app.set("view engine", "ejs");
app.use(express.static('client'))
app.use('\css', express.static(__dirname+"client/assets/css/")); 
app.use('\js', express.static(__dirname+"client/views/js/")); 


function home(req, res) {
    //Line6
    res.render("index");
  }

  router.route("/").get(home);

  app.use("/", home);

  app.set("port", process.env.PORT || 3000);

  app.listen(app.get("port"), () => {
    //Line10
    console.log("Application running in port: " + app.get("port"));
  });