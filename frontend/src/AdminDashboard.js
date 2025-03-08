import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Card, CardContent, Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Home, Group, School, Settings, ExitToApp, Dashboard as DashboardIcon } from "@mui/icons-material";

function AdminHome() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#0D47A1" }}>
        Admin Dashboard
      </Typography>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">Total Departments</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#1565C0" }}>10</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">Total Students</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#1565C0" }}>500</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">Total Faculty</Typography>
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

function ManageDepartments() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" color="#0D47A1">Manage Departments</Typography>
    </div>
  );
}

function ManageUsers() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" color="#0D47A1">Manage Users</Typography>
    </div>
  );
}

function ApproveStudents() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" color="#0D47A1">Approve Students</Typography>
    </div>
  );
}

function SystemConfiguration() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" color="#0D47A1">System Configuration</Typography>
    </div>
  );
}

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#0D47A1", color: "white" }}>
      <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#0D47A1", color: "white", fontSize: "20px", fontWeight: "bold" }}>
        Admin Panel
      </Box>
      <List>
        <ListItem button component={Link} to="/admin" sx={{ color: "#0D47A1" }}>
          <DashboardIcon sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin/departments" sx={{ color: "#0D47A1" }}>
          <Home sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Manage Departments" />
        </ListItem>
        <ListItem button component={Link} to="/admin/users" sx={{ color: "#0D47A1" }}>
          <Group sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button component={Link} to="/admin/students" sx={{ color: "#0D47A1" }}>
          <School sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Approve Students" />
        </ListItem>
        <ListItem button component={Link} to="/admin/settings" sx={{ color: "#0D47A1" }}>
          <Settings sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="System Configuration" />
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
        <Typography variant="h6">Admin Dashboard</Typography>
        <Button color="inherit" onClick={() => navigate("/")}>Logout <ExitToApp sx={{ marginLeft: 1 }} /></Button>
      </Toolbar>
    </AppBar>
  );
}

function AdminDashboard() {
  return (
    <div style={{ backgroundColor: "#E3F2FD", height: "100vh" }}>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "250px", flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="departments" element={<ManageDepartments />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="students" element={<ApproveStudents />} />
            <Route path="settings" element={<SystemConfiguration />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
