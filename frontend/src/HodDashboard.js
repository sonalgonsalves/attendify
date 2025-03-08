import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Card, CardContent, Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Dashboard, School, People, BarChart, Settings, Logout, Assignment } from "@mui/icons-material";

function HodHome() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#0D47A1" }}>
        HOD Dashboard
      </Typography>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">Total Students</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#1565C0" }}>10</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">Total Faculty</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#1565C0" }}>500</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">Total Batches</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#1565C0" }}>50</Typography>
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
  backgroundColor: "#BBDEFB",
};

function ConfigureEvaluation() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" color="#0D47A1">Configure Evaluation Patterns</Typography>
    </div>
  );
}

function ManageFaculty() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" color="#0D47A1">Manage Faculty</Typography>
    </div>
  );
}

function ManageStudents() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" color="#0D47A1">Manage Students</Typography>
    </div>
  );
}

function GenerateReports() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" color="#0D47A1">Generate Reports</Typography>
    </div>
  );
}

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#0D47A1", color: "white" }}>
      <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#0D47A1", color: "white", fontSize: "20px", fontWeight: "bold" }}>
        HOD Panel
      </Box>
      <List>
        <ListItem button component={Link} to="/hod" sx={{ color: "#0D47A1" }}>
          <Dashboard sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/hod/departments" sx={{ color: "#0D47A1" }}>
          <Assignment sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Configure Evaluation" />
        </ListItem>
        <ListItem button component={Link} to="/hod/faculty" sx={{ color: "#0D47A1" }}>
          <People sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Manage Faculty" />
        </ListItem>
        <ListItem button component={Link} to="/hod/students" sx={{ color: "#0D47A1" }}>
          <School sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Manage Students" />
        </ListItem>
        <ListItem button component={Link} to="/hod/reports" sx={{ color: "#0D47A1" }}>
          <BarChart sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Generate Reports" />
        </ListItem>
      </List>
    </Drawer>
  );
}

function TopBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: "#1565C0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">HOD Dashboard</Typography>
        <Button color="inherit" onClick={() => navigate("/")}>Logout <Logout sx={{ marginLeft: 1 }} /></Button>
      </Toolbar>
    </AppBar>
  );
}

function HodDashboard() {
  return (
    <div style={{ backgroundColor: "#E3F2FD", height: "100vh" }}>
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
