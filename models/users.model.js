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

function lendBook(email, bookId, title, author) {
  const sql =
    "INSERT INTO lentOut (email, bookId, title, author) VALUES (?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [email, bookId, title, author], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function getLoanedBooks(email) {
  const sql =
    "SELECT DISTINCT bookId, title, author FROM lentOut WHERE email = ?";

  return new Promise((resolve, reject) => {
    db.all(sql, email, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function returnBook(email, bookId) {
  const sql = "DELETE FROM lentOut WHERE email = ? AND bookID = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, email, bookId, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = {
  registerUser,
  getUser,
  lendBook,
  getLoanedBooks,
  returnBook,
};
