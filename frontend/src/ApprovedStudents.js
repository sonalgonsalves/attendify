import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_BASE_URL = "http://localhost:5000"; 

function ApprovedStudents() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [open, setOpen] = useState(false);
    const [editedData, setEditedData] = useState({ name: '', rollNumber: '', department: '', batch: '' });

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'rollNumber', headerName: 'USN', width: 150 },
        { field: 'dob', headerName: 'DOB', width: 150 },
        { field: 'batch', headerName: 'Batch', width: 100 },
        { field: 'department', headerName: 'Department', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    useEffect(() => {
        fetchApprovedStudents();
    }, []);

    const fetchApprovedStudents = async () => {
        try {
            const apiUrl = `${API_BASE_URL}/students/approved`;
            console.log("Fetching data from:", apiUrl); // Debugging URL
            const response = await axios.get(apiUrl);
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching approved students:", error);
        }
    };

    const handleEdit = (student) => {
        setEditedData({ ...student });
        setSelectedStudent(student);
        setOpen(true);
    };

    const handleDelete = async (student) => {
        if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
            try {
                await axios.delete(`${API_BASE_URL}/students/${student._id}`);
                fetchApprovedStudents();
            } catch (error) {
                console.error("Error deleting student:", error);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleUpdate();
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${API_BASE_URL}/students/update/${selectedStudent._id}`, editedData);
            fetchApprovedStudents();
            setOpen(false);
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    return (
        <div>
            <div style={{ height: 400, width: '100%', marginTop: 20 }}>
                <DataGrid rows={students} columns={columns} getRowId={(row) => row._id} />
            </div>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogContent>
                    <TextField 
                        label="Name"
                        type="text"
                        value={editedData.name}
                        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    <TextField 
                        label="USN"
                        type="text"
                        value={editedData.rollNumber}
                        onChange={(e) => setEditedData({ ...editedData, rollNumber: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    <TextField 
                        label="Batch"
                        type="text"
                        value={editedData.batch}
                        onChange={(e) => setEditedData({ ...editedData, batch: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    <TextField 
                        label="Department"
                        type="text"
                        value={editedData.department}
                        onChange={(e) => setEditedData({ ...editedData, department: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ApprovedStudents;
