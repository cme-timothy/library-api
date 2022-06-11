const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/users.controller");

usersRouter.post("/auth/register", usersController.register);

usersRouter.post("/auth/login", usersController.login);

usersRouter.post("/users/lend", usersController.lendBook);

usersRouter.post("/users/return", usersController.returnBook);

usersRouter.get("/me", usersController.userInfo);

module.exports = usersRouter;