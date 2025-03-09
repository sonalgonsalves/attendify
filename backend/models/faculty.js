const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String }, 
  semester: { type: Number, required: true },
  subjects: { type: [String], default: [] } 
});

module.exports = mongoose.model("Faculty", facultySchema);
