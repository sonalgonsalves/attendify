import React from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Card, CardContent, Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Home, Group, School, Settings, ExitToApp,Book,Dashboard as DashboardIcon } from "@mui/icons-material";

function FacultyHome() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#FFA500" }}>
        Faculty Dashboard
      </Typography>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="#E0E0E0">Subjects Assigned</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#FFA500" }}>5</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="#E0E0E0">Attendance Taken</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#FFA500" }}>15</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="#E0E0E0">Assessments Conducted</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#FFA500" }}>3</Typography>
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

function TopBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: "#1e1e1e" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="#FFA500">Faculty Dashboard</Typography>
        <Button color="inherit" onClick={() => navigate("/")}>Logout <ExitToApp sx={{ marginLeft: 1 }} /></Button>
      </Toolbar>
    </AppBar>
  );
}

function FacultyDashboard() {
  return (
    <div style={{ backgroundColor: "#121212", height: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<FacultyHome />} />
            <Route path="subjects" element={<PageContainer title="View Assigned Subjects" />} />
            <Route path="question-paper" element={<PageContainer title="Configure Question Paper Patterns" />} />
            <Route path="marks" element={<PageContainer title="Manage Marks" />} />
            <Route path="attendance" element={<PageContainer title="Take Attendance" />} />
            <Route path="freeze-marks" element={<PageContainer title="Freeze Marks" />} />
            <Route path="reports" element={<PageContainer title="Generate Reports" />} />
            <Route path="course-file" element={<PageContainer title="Generate Final Course File" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function PageContainer({ title }) {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" color="#FFA500">{title}</Typography>
    </div>
  );
}

export default FacultyDashboard;