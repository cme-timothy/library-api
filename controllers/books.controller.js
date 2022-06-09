const uuid = require("uuid");
const model = require("../models/books.model");

const getAllBooks = (req, res) => {
  res.statusMessage = "GET request for all books succeeded";
  res.status(200).json(model.books);
};

const getOneBook = (req, res) => {
  const items = req.url.split("/");
  const foundBook = model.books.find((book) => book.id === items[2]);
  if (foundBook) {
    const getBook = model.books.filter((book) => book.id === items[2]);
    res.statusMessage = "GET request for book succeeded";
    res.status(200).json(getBook);
  } else {
    res.statusMessage =
      "GET request for book failed, the server can not find the requested resource";
    res.status(404).end();
  }
};

const addBook = (req, res) => {
  const title = typeof req.body.title;
  const author = typeof req.body.author;
  const summary = typeof req.body.summary;
  const objectLength = Object.keys(req.body).length;
  if (
    title === "string" &&
    author === "string" &&
    summary === "string" &&
    objectLength === 3
  ) {
    model.books.push({
      id: uuid.v4(),
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
    });
    res.statusMessage =
      "POST request for book succeeded, and is added to the server";
    res.status(201).end();
  } else {
    res.statusMessage =
      "POST request for book failed, something wrong with the data sent";
    res.status(400).end();
  }
};

const changeBook = (req, res) => {
  res.send();
};

const changeBookSummary = (req, res) => {
  res.send();
};

const deleteBook = (req, res) => {
  const items = req.url.split("/");
  const foundBook = model.books.find((book) => book.id === items[2]);
  if (foundBook) {
    model.books = model.books.filter((book) => book.id !== items[2]);
    res.statusMessage =
      "DELETE request for book succeeded, and is deleted from the server";
    res.status(204).end();
  } else {
    res.statusMessage =
      "DELETE request for book failed, the server can not find the requested resource";
    res.status(404).end();
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  changeBook,
  changeBookSummary,
  deleteBook,
};
