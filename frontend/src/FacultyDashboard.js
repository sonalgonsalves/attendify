import React from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Card, CardContent, Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
<<<<<<< HEAD
import { Dashboard as DashboardIcon, School, Assignment, ExitToApp, ListAlt, CheckCircle, BarChart, Description } from "@mui/icons-material";
=======
import { Dashboard, Assignment, BarChart, Edit, CheckCircle, Description, Book } from "@mui/icons-material";

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
>>>>>>> fa4c1f7ef783e5e4589cc59c8ceaaf0611b25fc9

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
<<<<<<< HEAD
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
=======
      <Typography variant="h4" color="#FFA500">{title}</Typography>
>>>>>>> fa4c1f7ef783e5e4589cc59c8ceaaf0611b25fc9
    </div>
  );
}

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
      <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
        Faculty Panel
      </Box>
<<<<<<< HEAD
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
=======
      <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
        <ListItem button component={Link} to="/faculty" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Dashboard sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/subjects" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Book sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="View Assigned Subjects" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/question-paper" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Assignment sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Configure Question Paper Patterns" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/marks" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Edit sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Manage Marks" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/attendance" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <CheckCircle sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Take Attendance" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/freeze-marks" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <BarChart sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Freeze Marks" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/reports" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Description sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Generate Reports" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/course-file" 
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}>
          <Description sx={{ marginRight: 1, color: "inherit" }} />
          <ListItemText primary="Generate Final Course File" />
        </ListItem>
>>>>>>> fa4c1f7ef783e5e4589cc59c8ceaaf0611b25fc9
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
<<<<<<< HEAD
        <Button color="inherit" onClick={() => navigate("/")}>Logout <ExitToApp sx={{ ml: 1 }} /></Button>
=======
        <Button color="inherit" onClick={() => navigate("/")}>Logout</Button>
>>>>>>> fa4c1f7ef783e5e4589cc59c8ceaaf0611b25fc9
      </Toolbar>
    </AppBar>
  );
}

function FacultyDashboard() {
  return (
<<<<<<< HEAD
    <Box sx={{ backgroundColor: "#121212", height: "100vh" }}>
=======
    <div style={{ backgroundColor: "#121212", height: "100vh" }}>
>>>>>>> fa4c1f7ef783e5e4589cc59c8ceaaf0611b25fc9
      <TopBar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
<<<<<<< HEAD
        <Box sx={{ ml: 2, flex: 1, p: 3 }}>
=======
        <div style={{ marginLeft: "10px", flex: 1, padding: "20px" }}>
>>>>>>> fa4c1f7ef783e5e4589cc59c8ceaaf0611b25fc9
          <Routes>
            <Route path="/" element={<FacultyHome />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default FacultyDashboard;