import React from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Card, CardContent, Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Dashboard, School, People, BarChart, Assignment, Logout } from "@mui/icons-material";

function HodHome() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#FFA500" }}>
        HOD Dashboard
      </Typography>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="#E0E0E0">Total Students</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#FFA500" }}>10</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="#E0E0E0">Total Faculty</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#FFA500" }}>500</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="#E0E0E0">Total Batches</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#FFA500" }}>50</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const cardStyle = {
  width: "250px",
  padding: "15px",
  textAlign: "center",
  boxShadow: "2px 4px 10px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  backgroundColor: "#1e1e1e",
};

function ConfigureEvaluation() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" color="#FFA500">Configure Evaluation Patterns</Typography>
    </div>
  );
}

function ManageFaculty() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" color="#FFA500">Manage Faculty</Typography>
    </div>
  );
}

function ManageStudents() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" color="#FFA500">Manage Students</Typography>
    </div>
  );
}

function GenerateReports() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" color="#FFA500">Generate Reports</Typography>
    </div>
  );
}

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
      <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
        HOD Panel
      </Box>
      <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
        <ListItem button component={NavLink} to="/hod/dashboard" 
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
        <ListItem button component={NavLink} to="/hod/faculty" 
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
  );
}

function TopBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: "#1e1e1e" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="#FFA500">HOD Dashboard</Typography>
        <Button color="inherit" onClick={() => navigate("/")}>Logout <Logout sx={{ marginLeft: 1 }} /></Button>
      </Toolbar>
    </AppBar>
  );
}

function HodDashboard() {
  return (
    <div style={{ backgroundColor: "#121212", height: "100vh" }}>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "10px", flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HodHome />} />
            <Route path="departments" element={<ConfigureEvaluation />} />
            <Route path="faculty" element={<ManageFaculty />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="reports" element={<GenerateReports />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default HodDashboard;