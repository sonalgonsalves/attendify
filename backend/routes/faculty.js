const express = require("express");
const router = express.Router();
const Faculty = require("../models/faculty");

// ✅ Add a new faculty with validation
router.post("/", async (req, res) => {
    try {
  
      const { name, dob, semester, subjects } = req.body;
      if (!name || !semester) {
        return res.status(400).json({ error: "Name and semester are required" });
      }
  
      const newFaculty = new Faculty({ name, dob, semester, subjects });
      await newFaculty.save();
  
      res.status(201).json({ message: "Faculty added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// ✅ Get all faculty
router.get("/", async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.json(facultyList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update faculty details with validation
router.put("/:id", async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFaculty) return res.status(404).json({ error: "Faculty not found" });

    res.json({ message: "Faculty details updated", faculty: updatedFaculty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete faculty with validation
router.delete("/:id", async (req, res) => {
  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!deletedFaculty) return res.status(404).json({ error: "Faculty not found" });

    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
