import { Box, Container, Grid, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); // Changed from name to username for clarity
    const [role, setRole] = useState("");
    const [dob, setDob] = useState(""); // Changed from password to dob

    const [errors, setErrors] = useState({ username: "", role: "", dob: "" });

    const handleLogin = async (event) => {
        event.preventDefault();
    
        // validations
        let validationErrors = { username: "", role: "", dob: "" };
        let isValid = true;
    
        if (!username) {
            validationErrors.username = "Username is required";
            isValid = false;
        }
        if (!role) {
            validationErrors.role = "Role is required";
            isValid = false;
        }
        if (!dob) {
            validationErrors.dob = "Password is required";
            isValid = false;
        }
    
        if (!isValid) {
            setErrors(validationErrors);
            return;
        }
    
        try {
            // Role check
            if (role === "Admin") {
                // Predefined admin credentials
                const adminUsername = "admin";
                const adminPassword = "admin123"; // Predefined password
    
                if (username === adminUsername && dob === adminPassword) {
                    alert("Admin login successful!");
                    navigate('/admin/dashboard');
                } else {
                    alert("Invalid admin credentials");
                }
                return;
            } else if (role === "HOD") {
                // Predefined HOD credentials
                const hodUsername = "hod";
                const hodPassword = "hod123"; // Predefined password
    
                if (username === hodUsername && dob === hodPassword) {
                    alert("HOD login successful!");
                    navigate('/hod');
                } else {
                    alert("Invalid HOD credentials");
                }
                return;
            } else if (role === "Student") {
                // Logic to check student credentials
                const response = await axios.post('http://localhost:5000/auth/login', { role, username, dob });
                if (response.data.success) {
                    alert("Student login successful!");
                    navigate('/student');
                } else {
                    alert("Invalid student credentials");
                }
                return;
            } else if (role === "Faculty") {
                // Logic to check faculty credentials
                const response = await axios.post('http://localhost:5000/auth/login', { role, username, dob });
                if (response.data.success) {
                    alert("Faculty login successful!");
                    navigate('/faculty');
                } else {
                    alert("Invalid faculty credentials");
                }
                return;
            } else if (role === "Exam") {
                alert("Exam Staff login successful!");
                navigate('/exam');
                return;
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }
    };
    
    return (
        <Container maxWidth="xl" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: "#000000" }}>
            <Box sx={{ bgcolor: "#1e1e1e", padding: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#FFA500" }}>
                    <center><b>LOGIN</b></center>
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label={role === "Student" ? "USN" : role === "Faculty" ? "Name" : "Username"}
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={!!errors.username}
                                helperText={errors.username}
                                sx={{ bgcolor: "#1e1e1e", color: "#FFA500" }}
                                InputLabelProps={{ style: { color: "#FFA500" } }} // Label color
                                InputProps={{ style: { color: "#FFA500" } }} // Input text color
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!errors.role}>
                                <InputLabel id="role-select-label" sx={{ color: "#FFA500" }}>Role</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    id="role-select"
                                    label="Role"
                                    onChange={(e) => setRole(e.target.value)}
                                    sx={{ bgcolor: "#1e1e1e", color: "#FFA500" }}
                                >
                                    <MenuItem value={"Admin"}>Admin</MenuItem>
                                    <MenuItem value={"HOD"}>HOD</MenuItem>
                                    <MenuItem value={"Faculty"}>Faculty</MenuItem>
                                    <MenuItem value={"Student"}>Student</MenuItem>
                                </Select>
                                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Password"
                                type="text"
                                fullWidth
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                error={!!errors.dob}
                                helperText={errors.dob}
                                sx={{ bgcolor: "#1e1e1e", color: "#FFA500" }}
                                InputLabelProps={{ style: { color: "#FFA500" } }} // Label color
                                InputProps={{ style: { color: "#FFA500" } }} // Input text color
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: "#FFA500", color: "#000000" }}>
                                <b>LOGIN</b>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;