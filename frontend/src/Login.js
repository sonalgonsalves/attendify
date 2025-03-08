import { Box, Container, Grid, TextField, Button, Typography,FormControl,InputLabel,Select,MenuItem,FormHelperText } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({ name: "", role:"",password: "" });

    const handleLogin = (event) => {
        event.preventDefault();

        // validations
        let validationErrors = { name: "", password: "" };
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
        if (role === "admin") {
            alert("Admin login successful!");
            navigate('/admin');
            return;
        }
        else if (role === "HOD") {
            alert("HOD login successful!");
            navigate('/hod');
            return;
        }
        else if (role === "Faculty") {
            alert("Faculty login successful!");
            navigate('/faculty');
            return;
        }
        else if (role === "exam") {
            alert("Exam Staff login successful!");
            navigate('/exam');
            return;
        }

        /* user login check
        axios.post('http://localhost:5000/login', { name, password })
            .then(result => {
                if (result.data === "Success") {
                    alert("Login successful!");
                    navigate('/complaint');
                } else {
                    alert("Invalid credentials, please try again.");
                }
            })
            .catch(err => {
                console.error(err);
                alert("An error occurred while logging in. Please try again later.");
            });
            */
    };
    return (
        <Container maxWidth="xs" style={{ height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box >
                <Typography variant="h4" gutterBottom>
                    <b>LOGIN</b>
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.role}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Role"
                                onChange={(e) => setRole(e.target.value)}
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" fullWidth>
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
