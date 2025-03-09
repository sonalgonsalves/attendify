const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance");

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

// Fetch attendance records
router.get("/attendance/view", async (req, res) => {
    try {
        const attendance = await Attendance.find({});
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch attendance records" });
    }
});

module.exports = router;
