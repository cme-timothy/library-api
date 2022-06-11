const express = require("express");

const auth = require("../middlewares/auth");

const usersRouter = express.Router();
const usersController = require("../controllers/users.controller");

usersRouter.post("/auth/register", usersController.register);

usersRouter.post("/auth/login", usersController.login);

usersRouter.post("/users/lend", auth, usersController.lendBook);

usersRouter.post("/users/return", auth, usersController.returnBook);

usersRouter.get("/me", auth, usersController.userInfo);

module.exports = usersRouter;
