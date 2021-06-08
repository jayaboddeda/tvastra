const mongoose = require("mongoose");

const files = new mongoose.Schema({
  img: { type: String },
});

const addRecord = new mongoose.Schema({
  myfile: [files],
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
  reportType: {
    type: String,
    required: true,
  },
  email:{
    type: String
  }
});

const Record = new mongoose.model("Record", addRecord);

module.exports = Record;
