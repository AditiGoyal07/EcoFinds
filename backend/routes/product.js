const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../database");

const router = express.Router();
const SECRET = "hackathon_secret"; // ⚠️ in production, use env vars

// ---- CREATE PRODUCT ----
router.post("/", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });

    const userId = decoded.id;
    const { title, description, category, price, image } = req.body;

    const sql = `INSERT INTO products (title, description, category, price, image, userId) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [title, description, category, price, image, userId], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      db.get("SELECT profilePic FROM users WHERE id=?", [userId], (err2, row) => {
        if (err2) return res.json({ id: this.lastID, title, description, category, price, image, userId });
        res.json({ id: this.lastID, title, description, category, price, image, userId, profilePic: row?.profilePic });
      });
    });
  });
});

// ---- GET ALL PRODUCTS ----
router.get("/", (req, res) => {
  const sql = `
    SELECT p.*, u.profilePic 
    FROM products p 
    LEFT JOIN users u ON p.userId = u.id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// ---- GET PRODUCT BY ID ----
router.get("/:id", (req, res) => {
  const sql = `
    SELECT p.*, u.profilePic 
    FROM products p 
    LEFT JOIN users u ON p.userId = u.id
    WHERE p.id=?
  `;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Product not found" });
    res.json(row);
  });
});

// ---- UPDATE PRODUCT ----
router.put("/:id", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    const userId = decoded.id;

    const { title, description, category, price, image } = req.body;
    const sql = `UPDATE products SET title=?, description=?, category=?, price=?, image=? 
                 WHERE id=? AND userId=?`;
    db.run(sql, [title, description, category, price, image, req.params.id, userId], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Product not found or unauthorized" });
      res.json({ message: "Product updated successfully" });
    });
  });
});

// ---- DELETE PRODUCT ----
router.delete("/:id", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    const userId = decoded.id;

    const sql = `DELETE FROM products WHERE id=? AND userId=?`;
    db.run(sql, [req.params.id, userId], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Product not found or unauthorized" });
      res.json({ message: "Product deleted successfully" });
    });
  });
});

module.exports = router;
