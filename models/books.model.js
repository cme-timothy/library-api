const db = require("../config/db");

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
  const sql = "INSERT INTO library (title, author, summary) VALUES (?, ?, ?)";

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

function changeAllValues(title, author, summary, id) {
  const sql =
    "UPDATE library SET title = ?, author = ?, summary = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, title, author, summary, id, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function changeSummary(summary, id) {
  const sql = "UPDATE library SET summary = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, summary, id, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = { getAll, getOne, add, changeAllValues, changeSummary };
