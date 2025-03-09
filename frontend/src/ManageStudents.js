import React, { useState } from 'react';
import { Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from "axios";

const ManageStudents = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    dob: '',
    batch: '',
    semester: '',  // Changed from department to semester
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    else if (!/^[A-Za-z][A-Za-z\s]*$/.test(formData.name)) newErrors.name = 'Name should only contain alphabets and spaces, starting with an alphabet';
    
    if (!formData.rollNumber) newErrors.rollNumber = 'USN is required';
    
    if (!formData.batch) newErrors.batch = 'Batch is required';
    
    if (!formData.semester) newErrors.semester = 'Semester is required';  // Updated validation

    if (!formData.dob) newErrors.dob = 'Date of Birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await axios.post("http://localhost:5000/students", formData);
      console.log("Student Details Submitted:", response.data);
  
      setIsModalOpen(true);
      setFormData({ name: '', rollNumber: '', dob: '', batch: '', semester: '' });  // Updated reset
    } catch (error) {
      console.error("Error submitting student details:", error);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#121212",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFF"
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: "#FFA500" }}>
        Manage Students
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "#1E1E1E",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: "400px",
          color: "#FFF"
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2, color: "#FFA500" }}>
          Add Student Details
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mb: 2, input: { color: "#FFF" }, '& .MuiInputLabel-root': { color: "#FFA500" } }}
        />

        <TextField
          fullWidth
          label="USN"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          error={!!errors.rollNumber}
          helperText={errors.rollNumber}
          sx={{ mb: 2, input: { color: "#FFF" }, '& .MuiInputLabel-root': { color: "#FFA500" } }}
        />    
        <TextField
          fullWidth
          label="Date of Birth"
          name="dob"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.dob}
          onChange={handleChange}
          error={!!errors.dob}
          helperText={errors .dob}
          sx={{ mb: 2, input: { color: "#FFA500" }, '& .MuiInputLabel-root': { color: "#FFA500" } }}
        />

        <TextField
          fullWidth
          label="Batch"
          name="batch"
          value={formData.batch}
          onChange={handleChange}
          error={!!errors.batch}
          helperText={errors.batch}
          sx={{ mb: 2, input: { color: "#FFF" }, '& .MuiInputLabel-root': { color: "#FFA500" } }}
        />

        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.semester}>
          <InputLabel sx={{ color: "#FFA500" }}>Semester</InputLabel>
          <Select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            sx={{ color: "#FFF" }}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="1">Semester 1</MenuItem>
            <MenuItem value="2">Semester 2</MenuItem>
            <MenuItem value="3">Semester 3</MenuItem>
            <MenuItem value="4">Semester 4</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#FFA500", color: "#121212" }}
        >
          Submit
        </Button>
      </Box>

      {/* Success Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle sx={{ backgroundColor: "#1E1E1E", color: "#FFA500" }}>Success</DialogTitle>
        <DialogContent sx={{ backgroundColor: "#1E1E1E", color: "#FFF" }}>
          <Typography>Student details submitted successfully!</Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#1E1E1E" }}>
          <Button onClick={() => setIsModalOpen(false)} variant="contained" sx={{ backgroundColor: "#FFA500", color: "#121212" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageStudents;