const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance");
const Student = require("../models/students");

// Fetch approved students by semester
router.get("/students/approved", async (req, res) => {
    const { semester } = req.query;

    if (!semester) {
        return res.status(400).json({ error: "Semester is required" });
    }

    try {
        const approvedStudents = await Student.find({ semester, status: "Approved" });

        if (approvedStudents.length === 0) {
            return res.status(404).json({ error: "No approved students found" });
        }

        res.json(approvedStudents);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

// Update attendance
router.post("/attendance/update", async (req, res) => {
    const { semester, date, subjects, students } = req.body;

    if (!semester || !date || !students || students.length === 0) {
        return res.status(400).json({ error: "Missing required fields or empty student list" });
    }

    try {
        const existingAttendance = await Attendance.findOne({ semester, date });

        if (existingAttendance) {
            existingAttendance.students = students;
            existingAttendance.subjects = subjects; // Update subjects as well
            await existingAttendance.save();
            return res.json({ message: "Attendance updated successfully!" });
        } else {
            const newAttendance = new Attendance({ semester, date, subjects, students });
            await newAttendance.save();
            return res.json({ message: "Attendance saved successfully!" });
        }
    } catch (error) {
        console.error("Error updating attendance:", error);
        return res.status(500).json({ error: "Failed to update attendance" });
    }
});

// Fetch all attendance records
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