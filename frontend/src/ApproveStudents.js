import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Drawer, List, ListItem, ListItemText, Box, Grid, Paper, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, FormControl, InputLabel, Select, MenuItem, AppBar, Toolbar
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Home from "@mui/icons-material/Home";
import Group from "@mui/icons-material/Group";
import School from "@mui/icons-material/School";
import Settings from "@mui/icons-material/Settings";
import ExitToApp from "@mui/icons-material/ExitToApp"

const Sidebar = () => (
  <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
    <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
      Admin Panel
    </Box>
    <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
      {[
        { to: "/admin/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
        { to: "/admin/departments", icon: <Home />, label: "Manage Departments" },
        { to: "/admin/users", icon: <Group />, label: "Manage Users" },
        { to: "/admin/ApproveStudents", icon: <School />, label: "Approve Students" },
        { to: "/admin/settings", icon: <Settings />, label: "System Configuration" }
      ].map(({ to, icon, label }) => (
        <ListItem
          button
          key={to}
          component={NavLink}
          to={to}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#FFA500" : "transparent",
            color: isActive ? "#000000" : "#FFA500"
          })}
        >
          {icon}
          <ListItemText primary={label} sx={{ marginLeft: 1 }} />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

const ApproveStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.post("http://localhost:5000/api/students/updateStatus", { id, status: newStatus });
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student._id === response.data._id ? { ...student, status: response.data.status } : student
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredStudents = students.filter(student =>
    (statusFilter === "" || student.status === statusFilter) &&
    (departmentFilter === "" || student.department === departmentFilter)
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212", color: "#FFA500" }}>
      <Sidebar />
      <Box p={3} sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
              <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" color="#FFA500">APPROVE STUDENTS</Typography>
                <Button color="inherit" onClick={() => navigate("/")}>Logout <ExitToApp sx={{ marginLeft: 1 }} /></Button>
              </Toolbar>
            </AppBar>
        
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          {[{
            label: "Filter by Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: ["All", "Pending", "Approved", "Rejected"]
          }, {
            label: "Filter by Department",
            value: departmentFilter,
            onChange: setDepartmentFilter,
            options: ["All", "Computer Science", "Electronics", "Mechanical"]
          }].map(({ label, value, onChange, options }, index) => (
            <Grid item xs={6} key={index}>
              <FormControl fullWidth sx={{ backgroundColor: "#1E1E1E", borderRadius: "5px" }}>
                <InputLabel sx={{ color: "#FFA500" }}>{label}</InputLabel>
                <Select value={value} onChange={e => onChange(e.target.value)} sx={{ color: "#FFA500" }}>
                  {options.map(opt => <MenuItem key={opt} value={opt === "All" ? "" : opt}>{opt}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4} align="center">
          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ backgroundColor: "#1E1E1E" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#FFA500" }}>
                    {["Name", "USN", "Batch", "Department", "Status"].map(head => (
                      <TableCell key={head} align="center" sx={{ fontWeight: "bold", color: "#121212" }}>{head}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.map(student => (
                    <TableRow key={student._id} sx={{ backgroundColor: "#1E1E1E", color: "#FFA500" }}>
                      <TableCell align="center"  sx={{ color: "#FFA500" }}>{student.name}</TableCell>
                      <TableCell align="center"  sx={{ color: "#FFA500" }}>{student.rollNumber}</TableCell>
                      <TableCell align="center"  sx={{ color: "#FFA500" }}>{student.batch}</TableCell>
                      <TableCell align="center" sx={{ color: "#FFA500" }}>{student.department}</TableCell>
                      <TableCell align="center">
                        <Select value={student.status} onChange={(e) => handleStatusChange(student._id, e.target.value)} sx={{ color: "#FFA500" }}>
                          {["Pending", "Approved", "Rejected"].map(status => (
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                          ))}
                        </Select>
                      </TableCell>
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
};

export default ApproveStudents;
