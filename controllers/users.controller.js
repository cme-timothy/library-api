const md5 = require("md5");
const model = require("../models/users.model");

const register = async (req, res) => {
  const username = typeof req.body.username;
  const email = typeof req.body.email;
  const password = typeof req.body.password;
  const objectLength = Object.keys(req.body).length;
  if (
    username === "string" &&
    email === "string" &&
    password === "string" &&
    objectLength === 3
  ) {
    await model.registerUser(
      req.body.username,
      req.body.email,
      md5(req.body.password)
    );
    res.statusMessage =
      "POST request to register a user succeeded, and is added to the server";
    res.status(201).end();
  } else {
    res.statusMessage =
      "POST request to register a user failed, something wrong with the data sent";
    res.status(400).end();
  }
};

const login = async (req, res) => {};

const lendBook = async (req, res) => {};

const returnBook = async (req, res) => {};

const userInfo = async (req, res) => {};

module.exports = { register, login, lendBook, returnBook, userInfo };
