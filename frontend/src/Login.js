import { Box, Container, Grid, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExitToApp } from "@mui/icons-material";

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({ name: "", role: "", password: "" });

    const handleLogin = (event) => {
        event.preventDefault();

        // validations
        let validationErrors = { name: "", role: "", password: "" };
        let isValid = true;

        if (!name) {
            validationErrors.name = "Username is required";
            isValid = false;
        }
        if (!role) {
            validationErrors.role = "Role is required";
            isValid = false;
        }
        if (!password) {
            validationErrors.password = "Password is required";
            isValid = false;
        }

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        // Role check
        if (role === "Admin") {
            alert("Admin login successful!");
            navigate('/admin');
            return;
        } else if (role === "HOD") {
            alert("HOD login successful!");
            navigate('/hod');
            return;
        } else if (role === "Faculty") {
            alert("Faculty login successful!");
            navigate('/faculty');
            return;
        } else if (role === "Student") {
            alert("Student login successful!");
            navigate('/student');
            return;
        } else if (role === "Exam") {
            alert("Exam Staff login successful!");
            navigate('/exam');
            return;
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
                                label="Username"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
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
                                    <MenuItem value={"Exam"}>Exam Department Staff</MenuItem>
                                </Select>
                                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
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