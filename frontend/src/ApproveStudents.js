import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Home from "@mui/icons-material/Home";
import Group from "@mui/icons-material/Group";
import School from "@mui/icons-material/School";
import Settings from "@mui/icons-material/Settings";

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
      <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
        Admin Panel
      </Box>
      <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
        <ListItem button component={NavLink} to="/admin" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <DashboardIcon sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={NavLink} to="/admin/departments" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Home sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Manage Departments" />
        </ListItem>
        <ListItem button component={NavLink} to="/admin/users" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Group sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button component={NavLink} to="/admin/ApproveStudents" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <School sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Approve Students" />
        </ListItem>
        <ListItem button component={NavLink} to="/admin/settings" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Settings sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="System Configuration" />
        </ListItem>
      </List>
    </Drawer>
  );
}

function ApproveStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleLogout = () => {
    navigate("/logout");
  };

  const filteredStudents = students.filter(
    (student) =>
      (statusFilter === "" || student.status === statusFilter) &&
      (departmentFilter === "" || student.department === departmentFilter)
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212", color: "#FFA500" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box p={3} sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#FFA500" }}>
          ADMIN DASHBOARD
        </Typography>

        <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            backgroundColor: "#FFA500",
            color: "#121212",
          }}
          onClick={handleLogout}
        >
          LOGOUT
        </Button>

        {/* Filters */}
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ backgroundColor: "#1E1E1E", borderRadius: "5px" }}>
              <InputLabel sx={{ color: "#FFA500" }}>Filter by Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ color: "#FFA500", borderBottom: "1px solid #FFA500" }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth sx={{ backgroundColor: "#1E1E1E", borderRadius: "5px" }}>
              <InputLabel sx={{ color: "#FFA500" }}>Filter by Department</InputLabel>
              <Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                sx={{ color: "#FFA500", borderBottom: "1px solid #FFA500" }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Mechanical">Mechanical</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Table */}
        <Grid container spacing={4} align="center">
          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ backgroundColor: "#1E1E1E" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#FFA500" }}>
                    {["Name", "Roll Number", "Batch", "Department", "Status"].map((head) => (
                      <TableCell key={head} align="center" sx={{ fontWeight: "bold", color: "#121212" }}>
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student._id} sx={{ backgroundColor: "#1E1E1E", color: "#FFA500" }}>
                      <TableCell align="center">{student.name}</TableCell>
                      <TableCell align="center">{student.rollNumber}</TableCell>
                      <TableCell align="center">{student.batch}</TableCell>
                      <TableCell align="center" sx={{ color: "#FFA500" }}>{student.department}</TableCell>
                      <TableCell align="center" sx={{ color: "#FFA500" }}>{student.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ApproveStudents;
