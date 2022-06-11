require("dotenv").config();
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const model = require("../models/users.model");
const modelBooks = require("../models/books.model");

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
    const userFound = await model.getUser(req.body.email);
    if (userFound) {
      res.statusMessage =
        "POST request to register a user failed, the user already exists on the server";
      res.status(409).end();
    } else {
      await model.registerUser(
        req.body.username,
        req.body.email,
        md5(req.body.password)
      );
      res.statusMessage =
        "POST request to register a user succeeded, and is added to the server";
      res.status(201).end();
    }
  } else {
    res.statusMessage =
      "POST request to register a user failed, something wrong with the data sent";
    res.status(400).end();
  }
};

const login = async (req, res) => {
  const email = typeof req.body.email;
  const password = typeof req.body.password;
  const objectLength = Object.keys(req.body).length;
  if (email === "string" && password === "string" && objectLength === 2) {
    const userFound = await model.getUser(req.body.email);
    const hashedPassword = md5(req.body.password);
    if (!userFound) {
      res.statusMessage =
        "POST request to login failed, the server can not find the user";
      res.status(404).end();
    } else if (userFound.password !== hashedPassword) {
      res.statusMessage =
        "POST request to login failed, the password does not match";
      res.status(400).end();
    } else {
      const token = jwt.sign(
        {
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
        },
        process.env.SECRET_KEY
      );
      res.statusMessage = "POST request to login a user succeeded";
      res.status(200).json(token);
    }
  } else {
    res.statusMessage =
      "POST request to login a user failed, something wrong with the data sent";
    res.status(400).end();
  }
};

const lendBook = async (req, res) => {
  const id = typeof req.body.id;
  const objectLength = Object.keys(req.body).length;
  if (id === "number" && objectLength === 1) {
    const foundBook = await modelBooks.getOne(req.body.id);
    if (!foundBook) {
      res.statusMessage =
        "POST request to loan book failed, the server can not find the book";
      res.status(404).end();
    } else {
      await model.lend(req.user.email, req.body.id);
      res.statusMessage = "POST request to loan book succeeded";
      res.status(200).end();
    }
  } else {
    res.statusMessage =
      "POST request to login a user failed, something wrong with the data sent";
    res.status(400).end();
  }
};

const returnBook = async (req, res) => {};

const userInfo = async (req, res) => {
  const result = await model.getUser(req.user.email);
  const info = {
    id: result.id,
    username: result.username,
    email: result.email,
  };
  console.log(info);
  res.statusMessage = "GET request for user succeeded";
  res.status(200).json(info);
};

module.exports = { register, login, lendBook, returnBook, userInfo };
