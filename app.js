// index.js
require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

//serve stactic file
app.use(express.static("public"));

// user routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/admin_profileRoutes");
const applicantProfile = require("./routes/applicant_ProfileRoutes");
const applicant = require("./routes/applicantRoutes");

// client routes
const clientProfile = require("./routes/client_profileRoutes");
const client = require("./routes/clientRoutes");
const payment_record = require("./routes/payment_recordRoutes");
const project = require("./routes/projectRoutes");
const talentProfile = require("./routes/talent_profileRoutes");
const talent = require("./routes/talentRoutes");

const edit_talent = require("./routes/edit_talent_profileRoutes");
const hire_request = require("./routes/hire_requestRoutes");
const search = require("./routes/searchRoutes");
const view = require("./routes/viewRoutes");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applicantProfile", applicantProfile);
app.use("/api/applicant", applicant);
app.use("/api/clientProfile", clientProfile);
app.use("/api/client", client);
app.use("/api/payments", payment_record);
app.use("/api/projects", project);
app.use("/api/talentProfile", talentProfile);
app.use("/api/talent", talent);
app.use("/api/edit_profile", edit_talent);
app.use("/api/hire_request", hire_request);
app.use("/api/search", search);
app.use("/api/view", view);

app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: "public" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
