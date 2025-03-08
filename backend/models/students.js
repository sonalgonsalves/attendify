const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    batch: { type: String, required: true },
    department: { type: String, required: true },
    dob: { type: String, required: true,match: /^\d{4}-\d{2}-\d{2}$/ },
    status: { type: String, default: "Pending" },
    dateAdded: { type: String, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
