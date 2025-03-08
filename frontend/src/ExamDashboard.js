import React from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Assessment, ExitToApp, Dashboard as DashboardIcon } from "@mui/icons-material";

function ExamHome() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#FFA500" }}>
        Exam Department Dashboard
      </Typography>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <p>Image here</p>
      </div>
    </div>
  );
}

function GenerateHallTicket() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" color="#FFA500">Generate Hall Ticket</Typography>
    </div>
  );
}

function UploadMarks() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" color="#FFA500">Upload Semester End Marks</Typography>
    </div>
  );
}

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
      <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
        Exam Department Panel
      </Box>
      <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
        <ListItem button component={NavLink} to="/exam" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <DashboardIcon sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={NavLink} to="/exam/hallticket" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Assessment sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Generate hall tickets" />
        </ListItem>
        <ListItem button component={NavLink} to="/exam/upload" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Assessment sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Upload semester-end marks" />
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
        <Typography variant="h6" color="#FFA500">Exam Dashboard</Typography>
        <Button color="inherit" onClick={() => navigate("/")}>Logout <ExitToApp sx={{ marginLeft: 1 }} /></Button>
      </Toolbar>
    </AppBar>
  );
}

function ExamDashboard() {
  return (
    <div style={{ backgroundColor: "#121212", height: "100vh" }}>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "10px", flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<ExamHome />} />
            <Route path="hallticket" element={<GenerateHallTicket />} />
            <Route path="upload" element={<UploadMarks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ExamDashboard;