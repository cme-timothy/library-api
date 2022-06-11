const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
  const libraryStmt = `
    CREATE TABLE library (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        summary TEXT
    )
    `;
  const usersStmt = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
    `;
  db.run(libraryStmt, (error) => {
    if (error) {
      console.error(error.message);
      //throw error;
    }
  });
  db.run(usersStmt, (error) => {
    if (error) {
      console.error(error.message);
      //throw error;
    }
  });
});

module.exports = db;
