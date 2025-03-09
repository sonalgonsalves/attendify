import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate } from "react-router-dom";
import { Dashboard, People, Assignment, School, BarChart } from "@mui/icons-material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const API_BASE_URL = "http://localhost:5000";

function PendingStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({ name: '', rollNumber: '', semester: '', batch: '' });  // Changed from department to semester
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingStudents();
  }, []);

  const fetchPendingStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students/pending`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching pending students:", error);
    }
  };

  const handleEdit = (student) => {
    setEditedData({ ...student });
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleDelete = async (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/students/${student._id}`);
        fetchPendingStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/students/update/${selectedStudent._id}`, editedData);
      fetchPendingStudents();
      setOpen(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'rollNumber', headerName: 'USN', width: 200 },
    { field: 'dob', headerName: 'DOB', width: 200 },
    { field: 'batch', headerName: 'Batch', width: 200 },
    { field: 'semester', headerName: 'Semester', width: 200 },  // Changed from department to semester
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)} sx={{ color: "#FFA500", marginLeft: "20px" }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)} sx={{ color: "#FFA500", marginLeft: "40px" }}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212", color: "#FFA500" }}>
      <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
        <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
          HOD Panel
        </Box>
              <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
                <ListItem button component={NavLink} to="/hod" 
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#FFA500" : "transparent",
                    color: isActive ? "#000000" : "#FFA500"
                  })}>
                  <Dashboard sx={{ marginRight: 1, color: "inherit" }} />
                  <ListItemText primary="Dashboard" />
                </ListItem>
                
                <ListItem button component={NavLink} to="/hod/ManageStudents" 
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#FFA500" : "transparent",
                    color: isActive ? "#000000" : "#FFA500"
                  })}>
                  <People sx={{ marginRight: 1, color: "inherit" }} />
                  <ListItemText primary="Manage Students" />
                </ListItem>
                <ListItem button component={NavLink} to="/hod/pendingStudents" 
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#FFA500" : "transparent",
                    color: isActive ? "#000000" : "#FFA500"
                  })}>
                  <School sx={{ marginRight: 1, color: "inherit" }} />
                  <ListItemText primary="Pending Students" />
                </ListItem>
                <ListItem button component={NavLink} to="/hod/departments" 
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#FFA500" : "transparent",
                    color: isActive ? "#000000" : "#FFA500"
                  })}>
                  <Assignment sx={{ marginRight: 1, color: "inherit" }} />
                  <ListItemText primary="View Faculty" />
                </ListItem>
                <ListItem button component={NavLink} to="/hod/reports" 
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#FFA500" : "transparent",
                    color: isActive ? "#000000" : "#FFA500"
                  })}>
                  <BarChart sx={{ marginRight: 1, color: "inherit" }} />
                  <ListItemText primary="View Attendance" />
                </ListItem>
              </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" color="#FFA500">PENDING STUDENTS</Typography>
            <Button color="inherit" onClick={() => navigate("/")}>
              Logout <ExitToAppIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ height: 400, width: '100%', marginTop: 20 }}>
          <DataGrid
            rows={students}
            columns={columns}
            getRowId={(row) => row._id}
            sx={{
              '.MuiDataGrid-cell': {
                color: '#FFA500', // Cell text color
              },
              '.MuiDataGrid-columnHeaders': {
                backgroundColor: '#FFA500', // Header background color
                color: '#000000', // Header text color
                fontWeight: 'bold',
              },
              '.MuiDataGrid-columnHeader': {
                backgroundColor: '#FFA500', // Header background color
                color: '#000000', // Header text color
              },
              '.MuiDataGrid-columnHeaderTitle': {
                color: '#000000', // Header title text color
                fontWeight: 'bold',
              },
            }}
          />
        </div>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle sx={{ backgroundColor: '#121212', color: '#FFA500' }}>Edit Student</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#121212' }}>
            <TextField 
              label="Name"
              type="text"
              value={editedData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              fullWidth
              margin="dense"
              variant="outlined"
              sx={{ 
                input: { color: '#FFA500' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FFA500',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFA500',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFA500',
                  }
                }
              }}
              InputLabelProps={{
                style: { color: '#FFA500' } // Set label color to orange
              }}
            />
            <TextField 
              label="USN"
              type="text"
              value={editedData.rollNumber}
              onChange={(e) => setEditedData({ ...editedData, rollNumber: e.target.value })}
              fullWidth
              margin="dense"
              variant="outlined"
              sx={{ 
                input: { color: '#FFA500' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FFA500',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFA500',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFA500',
                  }
                }
              }}
              InputLabelProps={{
                style: { color: '#FFA500' } // Set label color to orange
              }}
            />
            <TextField 
              label="Batch"
              type="text"
              value={editedData.batch}
              onChange={(e) => setEditedData({ ...editedData, batch: e.target.value })}
              fullWidth
              margin="dense"
              variant="outlined"
              sx={{ 
                input: { color: '#FFA500' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FFA500',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFA500',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFA500',
                  }
                }
              }}
              InputLabelProps={{
                style: { color: '#FFA500' } // Set label color to orange
              }}
            />
            <TextField 
              label="Semester"  // Changed from Department to Semester
              type="text"
              value={editedData.semester}  // Updated to use semester
              onChange={(e) => setEditedData({ ...editedData, semester: e.target.value })}  // Updated to use semester
              fullWidth
              margin="dense"
              variant="outlined"
              sx={{ 
                input: { color: '#FFA500' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FFA500',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFA500',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFA500',
                  }
                }
              }}
              InputLabelProps={{
                style: { color: '#FFA500' } // Set label color to orange
              }}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#121212' }}>
            <Button onClick={() => setOpen(false)} sx={{ borderColor: '#FFA500', color: '#FFA500' }}>Cancel</Button>
            <Button onClick={handleSubmit} sx={{ backgroundColor: '#FFA500', color: '#121212' }}>Update</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default PendingStudents;