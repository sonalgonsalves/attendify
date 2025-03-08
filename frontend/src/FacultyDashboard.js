import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Card, CardContent, Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Dashboard, Assignment, BarChart, Edit, CheckCircle, Description, Book } from "@mui/icons-material";

function FacultyHome() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#0D47A1" }}>
        Faculty Dashboard
      </Typography>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">Subjects Assigned</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#1565C0" }}>5</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">Attendance Taken</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#1565C0" }}>15</Typography>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">Assessments Conducted</Typography>
            <Typography variant="h3" style={{ fontWeight: "bold", color: "#1565C0" }}>3</Typography>
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

function ViewSubjects() {
  return <PageContainer title="View Assigned Subjects" />;
}

function ConfigureQuestionPaper() {
  return <PageContainer title="Configure Question Paper Patterns" />;
}

function ManageMarks() {
  return <PageContainer title="Manage Marks" />;
}

function TakeAttendance() {
  return <PageContainer title="Take Attendance" />;
}

function FreezeMarks() {
  return <PageContainer title="Freeze Marks" />;
}

function GenerateReports() {
  return <PageContainer title="Generate Reports" />;
}

function GenerateFinalCourseFile() {
  return <PageContainer title="Generate Final Course File" />;
}

function PageContainer({ title }) {
  return (
    <div style={{ padding: "30px", backgroundColor: "#E3F2FD", height: "100vh" }}>
      <Typography variant="h4" color="#0D47A1">{title}</Typography>
    </div>
  );
}

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#0D47A1", color: "white" }}>
      <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#0D47A1", color: "white", fontSize: "20px", fontWeight: "bold" }}>
        Faculty Panel
      </Box>
      <List>
        <ListItem button component={Link} to="/faculty" sx={{ color: "#0D47A1" }}>
          <Dashboard sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/subjects" sx={{ color: "#0D47A1" }}>
          <Book sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="View Assigned Subjects" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/question-paper" sx={{ color: "#0D47A1" }}>
          <Assignment sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Configure Question Paper Patterns" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/marks" sx={{ color: "#0D47A1" }}>
          <Edit sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Manage Marks" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/attendance" sx={{ color: "#0D47A1" }}>
          <CheckCircle sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Take Attendance" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/freeze-marks" sx={{ color: "#0D47A1" }}>
          <BarChart sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Freeze Marks" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/reports" sx={{ color: "#0D47A1" }}>
          <Description sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Generate Reports" />
        </ListItem>
        <ListItem button component={Link} to="/faculty/course-file" sx={{ color: "#0D47A1" }}>
          <Description sx={{ marginRight: 1, color: "#0D47A1" }} />
          <ListItemText primary="Generate Final Course File" />
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
        <Typography variant="h6">Faculty Dashboard</Typography>
        <Button color="inherit" onClick={() => navigate("/")}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

function FacultyDashboard() {
  return (
    <div style={{ backgroundColor: "#E3F2FD", height: "100vh" }}>
      <TopBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "50px", flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<FacultyHome />} />
            <Route path="subjects" element={<ViewSubjects />} />
            <Route path="question-paper" element={<ConfigureQuestionPaper />} />
            <Route path="marks" element={<ManageMarks />} />
            <Route path="attendance" element={<TakeAttendance />} />
            <Route path="freeze-marks" element={<FreezeMarks />} />
            <Route path="reports" element={<GenerateReports />} />
            <Route path="course-file" element={<GenerateFinalCourseFile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;