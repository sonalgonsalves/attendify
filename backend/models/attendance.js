const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    semester: String, // Add semester field
    date: String, // Ensure it's stored as a String or Date type
    subjects: [String], // Add subjects field to store selected subjects
    students: [
        {
            studentId: mongoose.Schema.Types.ObjectId,
            name: String,
            present: Boolean
        }
    ]
});

module.exports = mongoose.model("Attendance", AttendanceSchema);