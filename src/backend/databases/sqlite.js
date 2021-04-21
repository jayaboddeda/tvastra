const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userRegistration",{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('connection successful')
}).catch((e) =>{
  console.log('No Connection');
})
// const sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: "path_to_database.sqlite"
//   });

//   const User = sequelize.define("user", {
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     email: {
//       type: Sequelize.STRING,
//       unique: true,
//       allowNull: false
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     gender: {
//         type: Sequelize.STRING,
//         allowNull:false
//     },
//     date:{
//         type: Sequelize.STRING,
//         allowNull:false
//     },
//     phonenumber:{
//         type:sequelize.INTEGER,
//         allowNull:false
//     }

//   });