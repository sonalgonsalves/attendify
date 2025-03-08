import React from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Card, CardContent, Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Assessment, ExitToApp, Dashboard as DashboardIcon } from "@mui/icons-material";

function StudentHome() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#FFA500" }}>
        Student Dashboard
      </Typography>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="#E0E0E0">Total attendance</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#FFA500" }}>10%</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="#E0E0E0">Marks obtained</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#FFA500" }}>500</Typography>
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
  boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
  backgroundColor: "#1e1e1e",
};

function ViewMarksAttend() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" color="#FFA500">View Marks and Attendance</Typography>
    </div>
  );
}

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
      <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
        Student Panel
      </Box>
      <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
        <ListItem button component={NavLink} to="/student" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <DashboardIcon sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={NavLink} to="/student/marks" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Assessment sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="View Marks and Attendance" />
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
        <Typography variant="h6" color="#FFA500">Student Dashboard</Typography>
        <Button color="inherit" onClick={() => navigate("/")}>Logout <ExitToApp sx={{ marginLeft: 1 }} /></Button>
      </Toolbar>
    </AppBar>
  );
}

function StudentDashboard() {
  return (
    <div style={{ backgroundColor: "#121212", height: "100vh" }}>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "10px", flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<StudentHome />} />
            <Route path="marks" element={<ViewMarksAttend />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;