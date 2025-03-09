const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    batch: { type: String, required: true },
    semester: { type: String, required: true },  // Changed from department to semester
    dob: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    status: { type: String, default: "Pending" },
    dateAdded: { type: Date, default: Date.now }  // Changed type to Date for better handling of date
});

module.exports = mongoose.model("Student", studentSchema);