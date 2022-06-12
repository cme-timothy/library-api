const express = require("express");
const booksRouter = express.Router();
const booksController = require("../controllers/books.controller");

booksRouter.get("/books", booksController.getAllBooks);

booksRouter.get("/books/:id", booksController.getOneBook);

booksRouter.post("/books", booksController.addBook);

booksRouter.put("/books/:id", booksController.changeBook);

booksRouter.patch("/books/:id", booksController.changeBookQuantity);

booksRouter.delete("/books/:id", booksController.deleteBook);

module.exports = booksRouter;
