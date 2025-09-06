const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const path = require("path");

const app = express();
// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // allow both
  })
);
app.use(bodyParser.json());

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = 5500;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
