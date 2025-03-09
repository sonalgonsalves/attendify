const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    department: String,
    date: String, // Ensure it's stored as a String or Date type
    students: [
        {
            studentId: mongoose.Schema.Types.ObjectId,
            name: String,
            present: Boolean
        }
    ]
});

module.exports = mongoose.model("Attendance", AttendanceSchema);