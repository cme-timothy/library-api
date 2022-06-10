const db = require("../config/db");
const books = [];

function getAll() {
  const sql = "SELECT * FROM library";

  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function getOne(id) {
  const sql = "SELECT * FROM library WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, id, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function add(title, author, summary) {
  const sql = `INSERT INTO library (title, author, summary) VALUES (?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.run(sql, [title, author, summary], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = { books, getAll, getOne, add };
