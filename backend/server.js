const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentsRoutes = require("./routes/students");
const attendanceRoutes = require("./routes/attendance");
const facultyRoutes = require("./routes/faculty");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/students", studentsRoutes);
app.use('/api', attendanceRoutes);
app.use("/faculty", facultyRoutes);
app.use("/auth", authRoutes);

const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/attendify"; // Change as per your DB

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
