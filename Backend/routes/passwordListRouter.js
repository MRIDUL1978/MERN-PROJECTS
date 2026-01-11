const express = require("express");
const passwordListRouter = express.Router();
const passwordListController = require("../controllers/passwordListController");
const isAuth = require("../middleware/isAuth");

passwordListRouter.get("/", isAuth, passwordListController.getAllPasswords);
passwordListRouter.post("/", isAuth, passwordListController.addPassword);
passwordListRouter.put("/:id", isAuth, passwordListController.updatePassword);
passwordListRouter.delete(
  "/:id",
  isAuth,
  passwordListController.deletePassword
);

module.exports = passwordListRouter;
