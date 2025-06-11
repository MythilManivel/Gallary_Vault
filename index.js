const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/classDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// ✅ Serve frontend files from /public
app.use(express.static(path.join(__dirname, "public")));

// ✅ Register API
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields required" });

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ error: "User already exists" });

  const newUser = new User({ email, password });
  await newUser.save();
  res.json({ message: "Registration successful!" });
});

// ✅ Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  res.json({ message: "Login successful!" });
});

// ✅ View all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ✅ Update user
app.put("/users/:id", async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, { email, password });
    res.json({ message: "User updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// ✅ Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

// ✅ Start server
app.listen(8080, () => {
  console.log("🚀 Server running at http://localhost:8080");
});
