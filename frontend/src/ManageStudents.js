import React, { useState } from 'react';
import { Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from "axios";

const ManageStudents = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    batch: '',
    department: '',
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    else if (!/^[A-Za-z][A-Za-z\s]*$/.test(formData.name)) newErrors.name = 'Name should only contain alphabets and spaces, starting with an alphabet';
    
    if (!formData.rollNumber) newErrors.rollNumber = 'Roll Number is required';
    
    if (!formData.batch) newErrors.batch = 'Batch is required';
    
    if (!formData.department) newErrors.department = 'Department is required';

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
      const response = await axios.post("http://localhost:5000/api/students", formData);
      console.log("Student Details Submitted:", response.data);
  
      setIsModalOpen(true);
      setFormData({ name: '', rollNumber: '', batch: '', department: '' });
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
          sx={{ mb: 2, input: { color: "#FFF" }, label: { color: "#FFA500" } }}
        />

        <TextField
          fullWidth
          label="Roll Number"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          error={!!errors.rollNumber}
          helperText={errors.rollNumber}
          sx={{ mb: 2, input: { color: "#FFF" }, label: { color: "#FFA500" } }}
        />

        <TextField
          fullWidth
          label="Batch"
          name="batch"
          value={formData.batch}
          onChange={handleChange}
          error={!!errors.batch}
          helperText={errors.batch}
          sx={{ mb: 2, input: { color: "#FFF" }, label: { color: "#FFA500" } }}
        />

        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.department}>
          <InputLabel sx={{ color: "#FFA500" }}>Department</InputLabel>
          <Select
            name="department"
            value={formData.department}
            onChange={handleChange}
            sx={{ color: "#FFF" }}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="CSE">Computer Science</MenuItem>
            <MenuItem value="ECE">Electronics & Communication</MenuItem>
            <MenuItem value="MECH">Mechanical Engineering</MenuItem>
            <MenuItem value="CIVIL">Civil Engineering</MenuItem>
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
