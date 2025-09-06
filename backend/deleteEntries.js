const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Replace with your database file
const dbPath = path.join(__dirname, "database.db");
const db = new sqlite3.Database(dbPath);

// Titles you want to delete
const productTitlesToDelete = ["anc", "sf"]; // put product titles here
const userIdsToDelete = [2];       // put user IDs here

// Delete products
productTitlesToDelete.forEach((title) => {
  db.run("DELETE FROM products WHERE title = ?", [title], function (err) {
    if (err) {
      return console.error("Error deleting product:", err.message);
    }
    console.log(`✅ Deleted product with title ${title}`);
  });
});

// Delete users
userIdsToDelete.forEach((id) => {
  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) {
      return console.error("Error deleting user:", err.message);
    }
    console.log(`✅ Deleted user with ID ${id}`);
  });
});

// Close DB after all deletions
setTimeout(() => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("✅ Database connection closed.");
  });
}, 1000);
