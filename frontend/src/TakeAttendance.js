import React, { useState } from "react";
import axios from "axios";
import {
    Button, TextField, FormControl, InputLabel, Select, MenuItem,
    Checkbox, FormControlLabel, Box, Typography, AppBar, Toolbar
} from "@mui/material";
import { Drawer, List, ListItem, ListItemText } from '@mui/material'; // Import necessary components for Sidebar
import { NavLink } from 'react-router-dom'; // Import NavLink for routing
import DashboardIcon from '@mui/icons-material/Dashboard'; // Import icons
import Home from '@mui/icons-material/Home';
import Group from '@mui/icons-material/Group';
import School from '@mui/icons-material/School';
import Settings from '@mui/icons-material/Settings';
import Book from '@mui/icons-material/Book';

const API_BASE_URL = "http://localhost:5000/api"; // Adjust if needed

function Sidebar() {
    return (
      <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
        <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
          Faculty Panel
        </Box>
        <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
          <ListItem button component={NavLink} to="/faculty" 
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#FFA500" : "transparent",
              color: isActive ? "#000000" : "#FFA500"
            })}>
            <DashboardIcon sx={{ marginRight: 1, color: "inherit" }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={NavLink} to="/faculty/subjects" 
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

function TakeAttendance() {
    const [department, setDepartment] = useState("");
    const [date, setDate] = useState("");
    const [students, setStudents] = useState([]);

    const fetchApprovedStudents = async () => {
        if (!department || !date) {
            alert("Please select a department and date.");
            return;
        }
    
        try {
            const response = await axios.get(`${API_BASE_URL}/students/approved`, { params: { department } });
    
            if (!response.data || response.data.length === 0) {
                alert("No approved students found for this department.");
                setStudents([]);
                return;
            }
    
            setStudents(response.data.map(student => ({
                ...student,
                present: false,
            })));
        } catch (error) {
            console.error("Error fetching students:", error);
            alert(`Failed to fetch students. ${error.response?.data?.error || error.message}`);
        }
    };
    
    const handleCheckboxChange = (index) => {
        setStudents(prevStudents =>
            prevStudents.map((student, i) =>
                i === index ? { ...student, present: !student.present } : student
            )
        );
    };

    const markAll = (isPresent) => {
        setStudents(prevStudents =>
            prevStudents.map(student => ({ ...student, present: isPresent }))
        );
    };

    const handleSaveAttendance = async () => {
        if (!date || !department) {
            alert("Please select a department and date.");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/attendance/update`, { 
                department,
                date,
                students: students.map(({ _id, name, present }) => ({
                    studentId: _id,
                    name,
                    present
                }))
            });

            if (response.status === 200) {
                alert("Attendance updated successfully!");
            } else {
                alert("Error saving attendance. Please try again.");
            }
        } catch (error) {
            console.error("Error updating attendance:", error);
            alert(`Failed to update attendance. ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", height: "100vh", backgroundColor: "#121212", color: "#FFA500" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: 3 }}>
                <Box sx={{ width: "50%", backgroundColor: "#1e1e1e", boxShadow: 3, borderRadius: 2, p: 3 }}>
                    <Typography variant="h6" sx={{ color: "#FFA500", textAlign: "center", fontWeight: "bold" }}>Take Attendance</Typography>

                    <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
                        <InputLabel sx={{ color: "#FFA500" }}>Select Department</InputLabel>
                        <Select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            sx={{ color: "#FFA500", backgroundColor: "#000000", borderRadius: 1 }}
                        >
                            <MenuItem value="CSE">Computer Science</MenuItem>
                            <MenuItem value="ECE">Electronics & Communication</MenuItem>
                            <MenuItem value="MECH">Mechanical Engineering</MenuItem>
                            <MenuItem value="CIVIL">Civil Engineering</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        type="date"
                        fullWidth
                        margin="dense"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        sx={{ input: { color: "#FFA500" }, backgroundColor: "#000000", borderRadius: 1, mt: 2 }}
                    />

                    <Button
                        variant="contained"
                        sx={{ mt: 3 , backgroundColor: "#FFA500", color: "#000000", "&:hover": { backgroundColor: "#cc8400" } }}
                        onClick={fetchApprovedStudents}
                    >
                        Fetch Students
                    </Button>

                    {students.length > 0 && (
                        <Box sx={{ mt: 3, backgroundColor: "#000000", borderRadius: 2, p: 2 }}>
                            <Typography variant="h6" sx={{ color: "#FFA500", textAlign: "center", mb: 2 }}>
                                Mark Attendance
                            </Typography>

                            {students.map((student, index) => (
                                <FormControlLabel
                                    key={student._id}
                                    control={
                                        <Checkbox
                                            checked={student.present}
                                            onChange={() => handleCheckboxChange(index)}
                                            sx={{ color: "#FFA500" }}
                                        />
                                    }
                                    label={`${student.name} (${student.rollNumber})`}
                                    sx={{ color: "#FFA500", display: "block" }}
                                />
                            ))}

                            <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#FFA500", color: "#000000", "&:hover": { backgroundColor: "#cc8400" } }}
                                    onClick={() => markAll(true)}
                                >
                                    Mark All Present
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ "&:hover": { backgroundColor: "#990000" } }}
                                    onClick={() => markAll(false)}
                                >
                                    Mark All Absent
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ "&:hover": { backgroundColor: "#0052cc" } }}
                                    onClick={handleSaveAttendance}
                                >
                                    Save Attendance
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default TakeAttendance;