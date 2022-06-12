const express = require("express");
const app = express();
const PORT = 4000;
const booksRouter = require("./router/books.router");
const usersRouter = require("./router/users.router");
const loggingMiddleware = require("./middlewares/logging");

app.use(express.json());

app.use(loggingMiddleware);

app.use(booksRouter);

app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
