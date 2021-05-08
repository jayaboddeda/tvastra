const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
    filename: function(req, file, callback) {
        console.log("file: ", file);
        callback(null, Date.now() + file.originalname);
    },
    destination: function(req, file, callback) {
        console.log("path: ",path.dirname("../"));
        console.log(path.dirname("./"));
        console.log(path.dirname(__dirname));
        callback(null,  path.join( path.dirname(__dirname) + "../../client/assets/images"));
        // path.join(__dirname + "/userData")
    }
});

let uploadProfilePhoto = multer({
    storage: storage
});

function uploadDocImg (req, res, next) {
    let upload = uploadProfilePhoto.single("image");

    upload( req, res, next);
}

module.exports = {
    uploadDocImg : uploadDocImg ,
    storage:storage 
}