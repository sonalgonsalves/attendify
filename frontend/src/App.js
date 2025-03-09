import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import HodDashboard from "./HodDashboard";
import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";
import ExamDashboard from "./ExamDashboard";
import ManageStudents from "./ManageStudents";
import ApproveStudents from "./ApproveStudents";
import ApprovedStudents from "./ApprovedStudents";
import PendingStudents from "./PendingStudents"; 
import TakeAttendance from "./TakeAttendance";
import ViewAttendance from "./ViewAttendance";
import ManageFaculty from "./ManageFaculty";
import ViewSubjects from "./ViewSubjects";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/faculty" element={<ManageFaculty />} />
        <Route path="/admin/ApproveStudents" element={<ApproveStudents />} />
        <Route path="/students/approved" element={<ApprovedStudents />} />
        <Route path="/hod" element={<HodDashboard />} />
        <Route path="/hod/ManageStudents" element={<ManageStudents />} />
        <Route path="/hod/pendingStudents" element={<PendingStudents />} />
        <Route path="/hod/reports" element={<ViewAttendance />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/view" element={<ViewSubjects/>} />
        <Route path="/faculty/attendance" element={<TakeAttendance />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
