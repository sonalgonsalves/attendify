import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import HodDashboard from "./HodDashboard";
import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";
import ExamDashboard from "./ExamDashboard";
import ManageStudents from "./ManageStudents";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/hod" element={<HodDashboard />} />
        <Route path="/hod/ManageStudents" element={<ManageStudents />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/exam" element={<ExamDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
