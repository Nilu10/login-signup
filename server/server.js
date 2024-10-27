// server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const app = express();
const PORT = 5001;

// Secret key for JWT signing and verification
const JWT_SECRET = "your_secret_key";

app.use(cors());
app.use(bodyParser.json());

// Temporary user data storage
const usersFilePath = path.join(__dirname, "users.json");

// Read users from file
const readUsers = () => {
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
  }
  return [];
};

// Write users to file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Register route
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  writeUsers(users);

  res.status(201).json({ message: "User registered successfully" });
});

// Login route
app.post("/login", (req, res) => {
  
  const { username, password } = req.body;
  
  // console.log(username);
  const users = readUsers();
  
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  console.log("call from postman "+user)
  // console.log("ashish");

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }
  
  // Generate a JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  
  res.status(200).json({ message: "Login successful", token });
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    req.user = decoded; // Save decoded info for later use
    next();
  });
};

// Protected route example
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.username}!` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
