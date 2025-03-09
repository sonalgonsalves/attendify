const express = require("express");
const router = express.Router();
const Student = require("../models/students"); // Adjust the path as necessary
const Faculty = require("../models/faculty"); // Adjust the path as necessary

// Predefined credentials for admin and HOD
const adminUsername = "admin";
const adminPassword = "admin123"; // Predefined password for admin
const hodUsername = "hod";
const hodPassword = "hod123"; // Predefined password for HOD

// Login route
router.post('/login', async (req, res) => {
    const { role, username, dob } = req.body;

    try {
        if (role === "Admin") {
            if (username === adminUsername && dob === adminPassword) {
                return res.status(200).json({ success: true, message: "Admin login successful" });
            } else {
                return res.status(401).json({ success: false, message: "Invalid admin credentials" });
            }
        } else if (role === "HOD") {
            if (username === hodUsername && dob === hodPassword) {
                return res.status(200).json({ success: true, message: "HOD login successful" });
            } else {
                return res.status(401).json({ success: false, message: "Invalid HOD credentials" });
            }
        } else if (role === "Student") {
            const student = await Student.findOne({ rollNumber: username, dob }); // Ensure the field name matches your schema
            if (student) {
                return res.status(200).json({ success: true, message: "Student login successful" });
            } else {
                return res.status(401).json({ success: false, message: "Invalid student credentials" });
            }
        } else if (role === "Faculty") {
            const faculty = await Faculty.findOne({ name: username, dob }); // Ensure the field name matches your schema
            if (faculty) {
                return res.status(200).json({ success: true, message: "Faculty login successful" });
            } else {
                return res.status(401).json({ success: false, message: "Invalid faculty credentials" });
            }
        } else {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "An error occurred during login" });
    }
});

module.exports = router;