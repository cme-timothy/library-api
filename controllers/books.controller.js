const model = require("../models/books.model");

const getAllBooks = async (req, res) => {
  const result = await model.getAll();
  res.statusMessage = "GET request for all books succeeded";
  res.status(200).json(result);
};

const getOneBook = async (req, res) => {
  const items = req.url.split("/");
  const result = await model.getOne(items[2]);
  if (result) {
    res.statusMessage = "GET request for book succeeded";
    res.status(200).json(result);
  } else {
    res.statusMessage =
      "GET request for book failed, the server can not find the requested resource";
    res.status(404).end();
  }
};

const addBook = async (req, res) => {
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
    const items = req.url.split("/");
    const foundbook = await model.alreadyExists(req.body.title);
    if (!foundbook) {
      await model.add(req.body.title, req.body.author, req.body.summary);
      res.statusMessage =
        "POST request for book succeeded, and is added to the server";
      res.status(201).end();
    } else {
      res.statusMessage =
        "POST request for book failed, the book already exists on the server";
      res.status(409).end();
    }
  } else {
    res.statusMessage =
      "POST request for book failed, something wrong with the data sent";
    res.status(400).end();
  }
};

const changeBook = async (req, res) => {
  const title = typeof req.body.title;
  const author = typeof req.body.author;
  const summary = typeof req.body.summary;
  const objectLength = Object.keys(req.body).length;
  const items = req.url.split("/");
  const foundBook = await model.getOne(items[2]);
  if (
    foundBook &&
    title === "string" &&
    author === "string" &&
    summary === "string" &&
    objectLength === 3
  ) {
    await model.changeAllValues(
      req.body.title,
      req.body.author,
      req.body.summary,
      items[2]
    );
    res.statusMessage =
      "PUT request for book succeeded, and is updated on the server";
    res.status(204).end();
  } else if (foundBook) {
    res.statusMessage =
      "PUT request for book failed, something wrong with the data sent";
    res.status(400).end();
  } else {
    res.statusMessage =
      "PUT request for book failed, the server can not find the requested resource";
    res.status(404).end();
  }
};

const changeBookSummary = async (req, res) => {
  const summary = typeof req.body.summary;
  const objectLength = Object.keys(req.body).length;
  const items = req.url.split("/");
  const foundBook = await model.getOne(items[2]);
  if (foundBook && summary === "string" && objectLength === 1) {
    await model.changeSummary(req.body.summary, items[2]);
    res.statusMessage =
      "PATCH request for book succeeded, and is updated on the server";
    res.status(204).end();
  } else if (foundBook) {
    res.statusMessage =
      "PATCH request for book failed, something wrong with the data sent";
    res.status(400).end();
  } else {
    res.statusMessage =
      "PATCH request for book failed, the server can not find the requested resource";
    res.status(404).end();
  }
};

const deleteBook = async (req, res) => {
  const items = req.url.split("/");
  const foundBook = await model.getOne(items[2]);
  if (foundBook) {
    await model.deleteOne(items[2]);
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
