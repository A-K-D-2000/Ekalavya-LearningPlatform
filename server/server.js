const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/learning", require("./routes/learningRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// Test Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/notifications", require("./routes/notificationRoutes"));

// Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});