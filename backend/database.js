const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, "ecofinds.db"), (err) => {
  if (err) {
    console.error("❌ Database connection error: " + err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

// Wait up to 5 seconds if DB is busy
db.configure("busyTimeout", 5000);

// Use serialize to run table creation queries sequentially
db.serialize(() => {
  // ---- USER TABLE ----
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT UNIQUE,
      password TEXT,
      profilePic TEXT
    )`,
    (err) => {
      if (err) console.error("❌ Error creating users table:", err.message);
    }
  );

  // ---- PRODUCT TABLE ----
  db.run(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      category TEXT,
      price REAL,
      image TEXT,
      userId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id)
    )`,
    (err) => {
      if (err) console.error("❌ Error creating products table:", err.message);
    }
  );
});

module.exports = db;
