import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Drawer,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import DashboardIcon from "@mui/icons-material/Dashboard"; // Import icons
import Home from "@mui/icons-material/Home";
import Group from "@mui/icons-material/Group";
import School from "@mui/icons-material/School";
import Settings from "@mui/icons-material/Settings";
import Book from "@mui/icons-material/Book";
import Assessment from "@mui/icons-material/Assessment"; // Import Assessment icon

const API_BASE_URL = "http://localhost:5000/api"; // Adjust if needed

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

function ViewAttendance() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAttendanceRecords = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/attendance`);
            setAttendanceRecords(response.data);
        } catch (error) {
            console.error("Error fetching attendance records:", error);
            setError(error.response?.data?.error || "Failed to fetch attendance records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendanceRecords();
    }, []);

    return (
        <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212", color: "#FFA500" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <AppBar position="static" sx={{ backgroundColor: "#121212", width: "100%" }}>
                    <Toolbar>
                        <Typography variant="h5" color="#FFA500" sx={{ flexGrow: 1 }}>
                            VIEW ATTENDANCE
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box sx={{ p: 3, width: "80%", backgroundColor: "#1e1e1e", boxShadow: 3, borderRadius: 2, mt: 5 }}>
                    <Typography variant="h6" sx={{ color: "#FFA500", textAlign: "center", fontWeight: "bold", mb: 2 }}>Attendance Records</Typography>

                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                            <CircularProgress sx={{ color: "#FFA500" }} />
                        </Box>
                    ) : error ? (
                        <Typography sx={{ color: "#FFA500", textAlign: "center" }}>{error}</Typography>
                    ) : (
                        <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", borderRadius: 2 }}>
                            <Table sx={{ minWidth: 650 }} aria-label="attendance records table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: "#FFA500", fontWeight: "bold" }}>Department</TableCell>
                                        <TableCell sx={{ color: "#FFA500", fontWeight: "bold" }}>Date</TableCell>
                                        <TableCell sx={{ color: "#FFA500", fontWeight: "bold" }}>Student Name</TableCell>
                                        <TableCell sx={{ color: "#FFA500", fontWeight: "bold" }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attendanceRecords.map((record) => (
                                        record.students.map((student) => (
                                            <TableRow key={student.studentId} sx={{ '&:hover': { backgroundColor: '#333' } }}>
                                                <TableCell sx={{ color: "#FFA500" }}>{record.department}</TableCell>
                                                <TableCell sx={{ color: "#FFA500" }}>{record.date}</TableCell>
                                                <TableCell sx={{ color: "#FFA500" }}>{student.name}</TableCell>
                                                <TableCell sx={{ color: "#FFA500" }}>{student.present ? "Present" : "Absent"}</TableCell>
                                            </TableRow>
                                        ))
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default ViewAttendance;