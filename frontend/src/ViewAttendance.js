import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

function ViewAttendance() {
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get('http://localhost:3003/attendance/percentage');
            setAttendanceData(response.data.message);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", backgroundColor: "#121212", color: "#FFA500", padding: 3 }}>
            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: "bold", mt: 2 }}>
                Attendance Summary
            </Typography>

            <TableContainer component={Paper} sx={{ maxWidth: 500, mt: 4, backgroundColor: "#1e1e1e", color: "#FFA500", boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#FFA500", fontWeight: "bold" }}>Department</TableCell>
                            <TableCell sx={{ color: "#FFA500", fontWeight: "bold" }}>Attendance (%)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendanceData.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ color: "#FFA500" }}>{data.department}</TableCell>
                                <TableCell sx={{ color: "#FFA500" }}>{data.percentage}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ViewAttendance;
