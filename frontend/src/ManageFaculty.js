import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { 
  IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, Box, FormControl, InputLabel, Select, MenuItem, FormGroup, 
  FormControlLabel, Checkbox, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText 
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const API_BASE_URL = "http://localhost:5000";

const Sidebar = () => (
  <Drawer variant="permanent" anchor="left" sx={{ width: 250, bgcolor: "#1e1e1e", color: "white" }}>
    <Box sx={{ padding: "20px", textAlign: "center", bgcolor: "#121212", color: "#FFA500", fontSize: "20px", fontWeight: "bold" }}>
      Admin Panel
    </Box>
    <List sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
      {[
        { to: "/admin/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
        { to: "/admin/faculty", icon: <HomeIcon />, label: "Manage Faculty" },
        { to: "/students/approved", icon: <GroupIcon />, label: "Manage Students" },
        { to: "/admin/ApproveStudents", icon: <SchoolIcon />, label: "Approve Students" },
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

function ManageFaculty() {
  const [faculties, setFaculties] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', dob: '', semester: '', subjects: [] });
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [editingFaculty, setEditingFaculty] = useState(null); // Track if editing
  const [isModalOpen, setIsModalOpen] = useState(false); // State for success modal
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // State for delete confirmation
  const [facultyToDelete, setFacultyToDelete] = useState(null); // Track which faculty to delete
  const navigate = useNavigate();

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/faculty`);
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const fetchSubjects = (semester) => {
    const semesterSubjects = {
      1: ["Math", "Physics", "Chemistry"],
      2: ["Programming", "Data Structures", "Electronics"],
      3: ["Algorithms", "Database", "Operating Systems"],
      4: ["AI", "Machine Learning", "Networking"]
    };
    setSubjectOptions(semesterSubjects[parseInt(semester)] || []);
  };

  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;
    setFormData({ ...formData, semester: selectedSemester, subjects: [] });
    fetchSubjects(selectedSemester);
  };

  const handleSubjectChange = (event, subject) => {
    const updatedSubjects = event.target.checked
      ? [...formData.subjects, subject]
      : formData.subjects.filter((s) => s !== subject);
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingFaculty) {
        // Update existing faculty
        await axios.put(`${API_BASE_URL}/faculty/${editingFaculty._id}`, formData);
      } else {
        // Add new faculty
        await axios.post(`${API_BASE_URL}/faculty`, formData);
      }
      fetchFaculties();
      setOpen(false);
      setEditingFaculty(null);
      resetFormData(); // Reset form data after submission
      if (!editingFaculty) {
        setIsModalOpen(true); // Open success modal only for new faculty
      }
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const handleEditClick = (faculty) => {
    setEditingFaculty(faculty);
    setFormData({
      name: faculty.name,
      dob: faculty.dob,
      semester: faculty.semester,
      subjects: faculty.subjects
    });
    fetchSubjects(faculty.semester);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setFacultyToDelete(id);
    setIsDeleteConfirmOpen(true); // Open delete confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/faculty/${facultyToDelete}`);
      fetchFaculties();
      setIsDeleteConfirmOpen(false);
      setFacultyToDelete(null);
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const resetFormData = () => {
    setFormData({ name: '', dob: '', semester: '', subjects: [] });
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'dob', headerName: 'DOB', width: 200 },
    { field: 'semester', headerName: 'Semester', width: 200 },
    { 
      field: 'subjects', 
      headerName: 'Subjects', 
      width: 300, 
      renderCell: (params) => params.row.subjects.join(", ") 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <>
          <IconButton sx={{ color: "#FFA500" }} onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton sx={{ color: "#FFA500" }} onClick={() => handleDeleteClick(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212", color: "#FFA500" }}>
      <Sidebar />
      <Box p={3} sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" color="#FFA500">MANAGE FACULTY</Typography>
            <Button color="inherit" onClick={() => navigate("/")}>
              Logout <ExitToAppIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <Button variant="contained" sx={{ backgroundColor: "#FFA500", color: "#121212" }} onClick={() => { 
            resetFormData(); // Reset form data when adding a new faculty
            setOpen(true); 
          }}>
            Add Faculty
          </Button>
          <div style={{ height: 400, width: '100%', marginTop: 20 }}>
            <DataGrid 
              rows={faculties} 
              columns={columns} 
              getRowId={(row) => row._id} 
              sx={{
                '.MuiDataGrid-cell': {
                  color: '#FFA500', // Cell text color
                },
                '.MuiDataGrid-columnHeaders': {
                  backgroundColor: '#FFA500', // Header background color
                  color: '#000000', // Header text color
                  fontWeight: 'bold',
                },
                '.MuiDataGrid-columnHeader': {
                  backgroundColor: '#FFA500', // Header background color
                  color: '#000000', // Header text color
                },
                '.MuiDataGrid-columnHeaderTitle': {
                  color: '#000000', // Header title text color
                  fontWeight: 'bold',
                },
                '.MuiDataGrid-iconButton': {
                  color: '#FFA500', // Icon button color
                }
              }}
            />
          </div>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle sx={{ backgroundColor: "#1E1E1E", color: "#FFA500" }}>{editingFaculty ? "Edit Faculty" : "Add Faculty"}</DialogTitle>
            <DialogContent sx={{ backgroundColor: "#1E1E1E" }}>
              <TextField 
                label="Name" 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                fullWidth margin="dense" 
                sx={{ 
                  input: { color: "#FFA500" }, // Text color
                  '& .MuiInputLabel-root': { color: "#FFA500" }, // Label color
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: "#FFA500" // Border color
                  },
                  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: "#FFA500" // Border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: "#FFA500" // Border color when focused
                  }
                }}
              />
              <TextField 
                label="Date of Birth" 
                type="date" 
                value={formData.dob} 
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })} 
                fullWidth margin="dense" 
                InputLabelProps={{ shrink: true }} 
                sx={{ 
                  input: { color: "#FFA500" }, // Text color
                  '& .MuiInputLabel-root': { color: "#FFA500" }, // Label color
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: "#FFA500" // Border color
                  },
                  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: "#FFA500" // Border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: "#FFA500" // Border color when focused
                  }
                }}
              />
              <FormControl fullWidth margin="dense" sx={{ backgroundColor: "#1E1E1E" }}>
                <InputLabel sx={{ color: "#FFA500" }}>Semester</InputLabel>
                <Select value={formData.semester} onChange={handleSemesterChange} sx={{ color: "#FFA500", '& .MuiOutlinedInput-notchedOutline': { borderColor: "#FFA500" } }}>
                  <MenuItem value={1}>Semester 1</MenuItem>
                  <MenuItem value={2}>Semester 2</MenuItem>
                  <MenuItem value={3}>Semester 3</MenuItem>
                  <MenuItem value={4}>Semester 4</MenuItem>
                </Select>
              </FormControl>
              <FormGroup>
                {subjectOptions.map((subject) => (
                  <FormControlLabel 
                    key={subject} 
                    control={
                      <Checkbox 
                        checked={formData.subjects.includes(subject)}
                        onChange={(event) => handleSubjectChange(event, subject)}
                        sx={{ color: "#FFA500", '&.Mui-checked': { color: "#FFA500" } }} // Checkbox color
                      />
                    } 
                    label={subject} 
                    sx={{ color: "#FFA500" }}
                  />
                ))}
              </FormGroup>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#1E1E1E" }}>
              <Button onClick={() => setOpen(false)} sx={{ color: "#FFA500" }}>Cancel</Button>
              <Button onClick={handleSubmit} color="primary" sx={{ backgroundColor: "#FFA500", color: "#121212" }}>
                {editingFaculty ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Success Modal */}
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DialogTitle sx={{ backgroundColor: "#1E1E1E", color: "#FFA500" }}>Success</DialogTitle>
            <DialogContent sx={{ backgroundColor: "#1E1E1E", color: "#FFF" }}>
              <Typography>Faculty details submitted successfully!</Typography>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#1E1E1E" }}>
              <Button onClick={() => setIsModalOpen(false)} variant="contained" sx={{ backgroundColor: "#FFA500", color: "#121212" }}>
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
            <DialogTitle sx={{ backgroundColor: "#1E1E1E", color: "#FFA500" }}>Confirm Delete</DialogTitle>
            <DialogContent sx={{ backgroundColor: "#1E1E1E", color: "#FFF" }}>
              <Typography>Are you sure you want to delete this faculty member?</Typography>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#1E1E1E" }}>
              <Button onClick={() => setIsDeleteConfirmOpen(false)} variant="contained" sx={{ backgroundColor: "#FFA500", color: "#121212" }}>
                Cancel
              </Button>
              <Button onClick={confirmDelete} variant="contained" sx={{ backgroundColor: "#FF0000", color: "#FFF" }}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default ManageFaculty;