const db = require("../config/db");

function registerUser(username, email, password) {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [username, email, password], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function getUser(email) {
  const sql = "SELECT * FROM users WHERE email = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, email, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function lend(email, bookId) {
  const sql = "INSERT INTO lentOut (email, bookId) VALUES (?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [email, bookId], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = { registerUser, getUser, lend };
