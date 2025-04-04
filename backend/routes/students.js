const express = require("express");
const router = express.Router();
const Student = require("../models/students");

// POST: Add a new student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST: Update the status of a student
router.post("/updateStatus", async (req, res) => {
  const { id, status } = req.body; 

  try {
    // Find the student by id
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update the student's status
    student.status = status;
    student.changes = `Status updated to ${status}`; 

    // Save the updated student to the database
    const updatedStudent = await student.save();

    // Send the updated student as a response
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET: Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().lean();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch only approved students
router.get("/approved", async (req, res) => {
  try {
    const students = await Student.find({ status: "Approved" }).lean();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update student details
router.put("/update/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, lean: true });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Remove a student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch only pending students
router.get("/pending", async (req, res) => {
  try {
    const students = await Student.find({ status: "Pending" }).lean();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
