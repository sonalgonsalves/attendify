import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, AppBar, Toolbar, Typography, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

// Add the missing icon imports
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const API_BASE_URL = "http://localhost:5000"; 

const Sidebar = () => (
  <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
    <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
      Admin Panel
    </Box>
    <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
      {[
        { to: "/admin/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
        { to: "/admin/faculty", icon: <HomeIcon />, label: "Manage Faculty" },
        { to: "/students/approved", icon: <GroupIcon />, label: "Manage Students" },
        { to: "/admin/ApproveStudents", icon: <SchoolIcon />, label: "Approve Students" },
      ].map(({ to, icon, label }) => (
        <ListItem
          button
          key={to}
          component={NavLink}
          to={to}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}
        >
          {icon}
          <ListItemText primary={label} sx={{ marginLeft: 1 }} />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

function ApprovedStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({ name: '', rollNumber: '', department: '', batch: '' });
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'rollNumber', headerName: 'USN', width: 200 },
    { field: 'dob', headerName: 'DOB', width: 200 },
    { field: 'batch', headerName: 'Batch', width: 200 },
    { field: 'department', headerName: 'Department', width: 200 },
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

  useEffect(() => {
    fetchApprovedStudents();
  }, []);

  const fetchApprovedStudents = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/students/approved`;
      console.log("Fetching data from:", apiUrl); // Debugging URL
      const response = await axios.get(apiUrl);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching approved students:", error);
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
        fetchApprovedStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleUpdate();
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE_URL}/students/update/${selectedStudent._id}`, editedData);
      fetchApprovedStudents();
      setOpen(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212", color: "#FFA500" }}>
      <Sidebar />
      <Box p={3} sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" color="#FFA500">MANAGE APPROVED STUDENTS</Typography>
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
              '.MuiDataGrid-iconButton': {
                color: '#FFA500', // Icon button color
              }
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
                style: { color: '#FFA500' }
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
                style: { color: '#FFA500' }
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
                style: { color: '#FFA500' }
              }}
            />
            <TextField 
              label="Department"
              type="text"
              value={editedData.department}
              onChange={(e) => setEditedData({ ...editedData, department: e.target.value })}
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
                  '&.Mui-focused field set': {
                    borderColor: '#FFA500',
                  }
                }
              }}
              InputLabelProps={{
                style: { color: '#FFA500' }
              }}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#121212' }}>
            <Button onClick={() => setOpen(false)} sx={{ color: '#FFA500' }}>Cancel</Button>
            <Button onClick={handleSubmit} sx={{ color: '#FFA500' }}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default ApprovedStudents;