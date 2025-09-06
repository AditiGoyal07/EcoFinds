const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../database");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const SECRET = "hackathon_secret";

// Multer setup for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get current user profile
router.get("/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });

    db.get(
      "SELECT id, username, email, profilePic FROM users WHERE id = ?",
      [decoded.id],
      (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
      }
    );
  });
});

// Update user profile (supports file upload)
router.put("/:id", upload.single("profilePic"), (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    if (decoded.id != req.params.id) return res.status(403).json({ error: "Unauthorized" });

    const { username, email, password } = req.body;
    let updateFields = [];
    let values = [];

    if (username) {
      updateFields.push("username=?");
      values.push(username);
    }
    if (email) {
      updateFields.push("email=?");
      values.push(email);
    }
    if (password) {
      const hashed = bcrypt.hashSync(password, 8);
      updateFields.push("password=?");
      values.push(hashed);
    }
    if (req.file) {
      updateFields.push("profilePic=?");
      values.push(`http://localhost:5500/uploads/${req.file.filename}`);
    }

    if (updateFields.length === 0) return res.status(400).json({ error: "No fields to update" });

    values.push(req.params.id);
    const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE id=?`;

    db.run(sql, values, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Profile updated successfully" });
    });
  });
});

module.exports = router;
