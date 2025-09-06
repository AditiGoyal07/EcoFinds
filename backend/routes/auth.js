const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database");

const router = express.Router();
const SECRET = "hackathon_secret"; // 🔒 use env variable in real projects

// Register
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  const hashedPassword = bcrypt.hashSync(password, 8);
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.run(sql, [username, email, hashedPassword], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({ error: "Email already registered" });
      }
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, username, email });
  });
});


// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err || !user) return res.status(400).json({ error: "User not found" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "2h" });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  });
});

module.exports = router;
