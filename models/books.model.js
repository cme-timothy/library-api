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

function alreadyExists(title) {
  const sql = "SELECT * FROM library WHERE title = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, title, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function add(title, author, about, quantity) {
  const sql = "INSERT INTO library (title, author, about, quantity) VALUES (?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [title, author, about, quantity], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function changeAllValues(title, author, about, quantity, id) {
  const sql =
    "UPDATE library SET title = ?, author = ?, about = ?, quantity = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, title, author, about, quantity, id, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function changeQuantity(quantity, id) {
  const sql = "UPDATE library SET quantity = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, quantity, id, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function deleteOne(id) {
  const sql = "DELETE FROM library WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, id, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = {
  getAll,
  getOne,
  alreadyExists,
  add,
  changeAllValues,
  changeQuantity,
  deleteOne,
};
