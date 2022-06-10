const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
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
  db.run(libraryStmt, (error) => {
    if (error) {
      //console.error(error.message);
      //throw error;
    } else {
      const insert =
        "INSERT INTO library (title, author, summary) VALUES (?, ?, ?)";
      db.run(insert, ["test", "test", "test"]);
    }
  });
});

module.exports = db;