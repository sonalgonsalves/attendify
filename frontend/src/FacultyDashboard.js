import React from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Card, CardContent, Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Dashboard as DashboardIcon, School, Assignment, ExitToApp, ListAlt, CheckCircle, BarChart, Description } from "@mui/icons-material";

const cardStyle = {
  width: "250px",
  padding: "15px",
  textAlign: "center",
  boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
  backgroundColor: "#1e1e1e",
};

function FacultyHome() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", height: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#FFA500" }}>
        Faculty Dashboard
      </Typography>
      <Box sx={{ display: "flex", gap: "20px", mt: 3 }}>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="#E0E0E0">Total Courses</Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#FFA500" }}>5</Typography>
          </CardContent>
        </Card>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="#E0E0E0">Total Students</Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#FFA500" }}>200</Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
      <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
        Faculty Panel
      </Box>
      <List sx={{ bgcolor: "#1e1e1e", height: "100%" }}>
        {[
          { to: "/faculty", icon: <DashboardIcon />, text: "Dashboard" },
          { to: "/faculty/subjects", icon: <ListAlt />, text: "View Assigned Subjects" },
          { to: "/faculty/question-paper", icon: <Assignment />, text: "Configure Question Paper Patterns" },
          { to: "/faculty/marks", icon: <CheckCircle />, text: "Manage Marks" },
          { to: "/faculty/attendance", icon: <School />, text: "Take Attendance" },
          { to: "/faculty/freeze-marks", icon: <CheckCircle />, text: "Freeze Marks" },
          { to: "/faculty/reports", icon: <BarChart />, text: "Generate Reports" },
          { to: "/faculty/final-course-file", icon: <Description />, text: "Generate Final Course File" }
        ].map(({ to, icon, text }) => (
          <ListItem 
            button 
            component={NavLink} 
            to={to} 
            sx={({ isActive }) => ({
              backgroundColor: isActive ? "#FFA500" : "transparent",
              color: isActive ? "#000000" : "#FFA500"
            })}
            key={to}
          >
            {icon}
            <ListItemText primary={text} sx={{ ml: 1 }} />
          </ListItem>
        ))}
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
        <Button color="inherit" onClick={() => navigate("/")}>Logout <ExitToApp sx={{ ml: 1 }} /></Button>
      </Toolbar>
    </AppBar>
  );
}

function FacultyDashboard() {
  return (
    <Box sx={{ backgroundColor: "#121212", height: "100vh" }}>
      <TopBar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ ml: 2, flex: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<FacultyHome />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default FacultyDashboard;