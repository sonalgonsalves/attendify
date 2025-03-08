const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    batch: { type: String, required: true },
    department: { type: String, required: true },
    status: { type: String, default: "Pending" },
    dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
