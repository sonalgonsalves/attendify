import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const API_BASE_URL = "http://localhost:5000";

function Sidebar() {
    return (
      <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
        <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
          Faculty Panel
        </Box>
        <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
          <ListItem button component={NavLink} to="/faculty/dashboard" 
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#FFA500" : "transparent",
              color: isActive ? "#000000" : "#FFA500"
            })}>
            <DashboardIcon sx={{ marginRight: 1, color: "inherit" }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={NavLink} to="/faculty/view" 
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#FFA500" : "transparent",
              color: isActive ? "#000000" : "#FFA500"
            })}>
            <Home sx={{ marginRight: 1, color: "inherit" }} />
            <ListItemText primary="View Assigned Subjects" />
          </ListItem>
          <ListItem button component={NavLink} to="/faculty/attendance" 
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#FFA500" : "transparent",
              color: isActive ? "#000000" : "#FFA500"
            })}>
            <Settings sx={{ marginRight: 1, color: "inherit" }} />
            <ListItemText primary="Take Attendance" />
          </ListItem>
        </List>
      </Drawer>
    );
}

function ViewSubjects() {
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

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

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'dob', headerName: 'DOB', width: 200 },
    { field: 'semester', headerName: 'Semester', width: 200 },
    {
      field: 'subjects',
      headerName: 'Subjects',
      width: 300,
      renderCell: (params) => params.row.subjects.join(", ") // Assuming subjects is an array
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212", color: "#FFA500" }}>
      <Sidebar />
      <Box p={3} sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" color="#FFA500">VIEW ASSIGNED SUBJECTS</Typography>
            <Button color="inherit" onClick={() => navigate("/")}>
              Logout <ExitToAppIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <div style={{ height: 400, width: '100%', marginTop: 20 }}>
            <DataGrid
              rows={faculties}
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
        </Box>
      </Box>
    </Box>
  );
}

export default ViewSubjects;