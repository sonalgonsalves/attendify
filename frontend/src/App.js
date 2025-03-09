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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/ApproveStudents" element={<ApproveStudents />} />
        <Route path="/students/approved" element={<ApprovedStudents />} />
        <Route path="/hod" element={<HodDashboard />} />
        <Route path="/hod/ManageStudents" element={<ManageStudents />} />
        <Route path="/hod/pendingStudents" element={<PendingStudents />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/faculty/attendance" element={<TakeAttendance />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/marks" element={<ViewAttendance />} />
        <Route path="/exam" element={<ExamDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
