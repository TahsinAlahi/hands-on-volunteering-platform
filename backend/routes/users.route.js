const router = require("express").Router();
const usersController = require("../controllers/users.controller");

router
  .get("/:id", usersController.getUserData)
  .patch("/:id", usersController.updateUserData);

module.exports = router;
