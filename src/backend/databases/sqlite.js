const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tvastra:tvastra@tvastracluster.dc40i.mongodb.net/userRegistration?retryWrites=true&w=majority",{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('connection successful')
}).catch((e) =>{
  console.log('No Connection');
})
