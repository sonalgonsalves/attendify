const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance");
const Student = require("../models/students"); // Ensure this model exists

// Fetch approved students by department
router.get("/students/approved", async (req, res) => {
    const { department } = req.query;

    if (!department) {
        return res.status(400).json({ error: "Department is required" });
    }

    try {
        const approvedStudents = await Student.find({ department, status: "Approved" });

        if (approvedStudents.length === 0) {
            return res.status(404).json({ error: "No approved students found" });
        }

        res.json(approvedStudents);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

// Update or insert attendance
router.post("/attendance/update", async (req, res) => {
    const { department, date, students } = req.body;

    if (!department || !date || !students || students.length === 0) {
        return res.status(400).json({ error: "Missing required fields or empty student list" });
    }

    try {
        const existingAttendance = await Attendance.findOne({ department, date });

        if (existingAttendance) {
            existingAttendance.students = students;
            await existingAttendance.save();
            return res.json({ message: "Attendance updated successfully!" });
        } else {
            const newAttendance = new Attendance({ department, date, students });
            await newAttendance.save();
            return res.json({ message: "Attendance saved successfully!" });
        }
    } catch (error) {
        console.error("Error updating attendance:", error);
        return res.status(500).json({ error: "Failed to update attendance" });
    }
});

// In your backend router file
router.get("/attendance", async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find();
        res.json(attendanceRecords);
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ error: "Failed to fetch attendance records" });
    }
});

module.exports = router;