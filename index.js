const express = require("express");
const app = express();
const PORT = 4000;
const booksRouter = require("./router/books.router");

app.use(express.json());

app.use(booksRouter);

app.listen(4000, () => {
  console.log(`Server running on port ${PORT}`);
});
