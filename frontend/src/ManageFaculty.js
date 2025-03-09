import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { 
  IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, Box, FormControl, InputLabel, Select, MenuItem, FormGroup, 
  FormControlLabel, Checkbox 
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_BASE_URL = "http://localhost:5000";

function ManageFaculty() {
  const [faculties, setFaculties] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', dob: '', semester: '', subjects: [] });
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [editingFaculty, setEditingFaculty] = useState(null); // Track if editing

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/faculty`);
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const fetchSubjects = (semester) => {
    const semesterSubjects = {
      1: ["Math", "Physics", "Chemistry"],
      2: ["Programming", "Data Structures", "Electronics"],
      3: ["Algorithms", "Database", "Operating Systems"],
      4: ["AI", "Machine Learning", "Networking"]
    };
    setSubjectOptions(semesterSubjects[parseInt(semester)] || []);
  };

  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;
    setFormData({ ...formData, semester: selectedSemester, subjects: [] });
    fetchSubjects(selectedSemester);
  };

  const handleSubjectChange = (event, subject) => {
    const updatedSubjects = event.target.checked
      ? [...formData.subjects, subject]
      : formData.subjects.filter((s) => s !== subject);
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingFaculty) {
        // Update existing faculty
        await axios.put(`${API_BASE_URL}/faculty/${editingFaculty._id}`, formData);
      } else {
        // Add new faculty
        await axios.post(`${API_BASE_URL}/faculty`, formData);
      }
      fetchFaculties();
      setOpen(false);
      setEditingFaculty(null);
      setFormData({ name: '', dob: '', semester: '', subjects: [] });
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const handleEditClick = (faculty) => {
    setEditingFaculty(faculty);
    setFormData({
      name: faculty.name,
      dob: faculty.dob,
      semester: faculty.semester,
      subjects: faculty.subjects
    });
    fetchSubjects(faculty.semester);
    setOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/faculty/${id}`);
      fetchFaculties();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'dob', headerName: 'DOB', width: 200 },
    { field: 'semester', headerName: 'Semester', width: 200 },
    { 
      field: 'subjects', 
      headerName: 'Subjects', 
      width: 300, 
      renderCell: (params) => params.row.subjects.join(", ") 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton sx={{ color: "#FFA500" }} onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton sx={{ color: "#FF0000" }} onClick={() => handleDeleteClick(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="contained" color="primary" onClick={() => { setEditingFaculty(null); setOpen(true); }}>
        Add Faculty
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={faculties} columns={columns} getRowId={(row) => row._id} />
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingFaculty ? "Edit Faculty" : "Add Faculty"}</DialogTitle>
        <DialogContent>
          <TextField 
            label="Name" 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            fullWidth margin="dense" 
          />
          <TextField 
            label="Date of Birth" 
            type="date" 
            value={formData.dob} 
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })} 
            fullWidth margin="dense" 
            InputLabelProps={{ shrink: true }} 
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Semester</InputLabel>
            <Select value={formData.semester} onChange={handleSemesterChange}>
              <MenuItem value={1}>Semester 1</MenuItem>
              <MenuItem value={2}>Semester 2</MenuItem>
              <MenuItem value={3}>Semester 3</MenuItem>
              <MenuItem value={4}>Semester 4</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            {subjectOptions.map((subject) => (
              <FormControlLabel 
                key={subject} 
                control={
                  <Checkbox 
                    checked={formData.subjects.includes(subject)}
                    onChange={(event) => handleSubjectChange(event, subject)}
                  />
                } 
                label={subject} 
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {editingFaculty ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ManageFaculty;
