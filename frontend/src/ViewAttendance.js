import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, AppBar, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";

const API_BASE_URL = "http://localhost:5000/api"; // Adjust if needed

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
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#121212", color: "#FFA500", alignItems: "center", padding: 3 }}>
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
                                    <TableCell sx={{ color: "#FFA500", fontWeight: "bold" }}>Student ID</TableCell>
                                    <TableCell sx={{ color: "#FFA500", fontWeight: "bold" }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendanceRecords.map((record) => (
                                    record.students.map((student) => (
                                        <TableRow key={student.studentId} sx={{ '&:hover': { backgroundColor: '#333' } }}>
                                            <TableCell sx={{ color: "#FFA500" }}>{record.department}</TableCell>
                                            <TableCell sx={{ color: "#FFA500" }}>{record.date}</TableCell>
                                            <TableCell sx={{ color: "#FFA500" }}>{student.studentId}</TableCell>
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
    );
}

export default ViewAttendance;