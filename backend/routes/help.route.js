const router = require("express").Router();
const helpsController = require("../controllers/help.controller.js");

router
  .post("/create", helpsController.createHelp)
  .post("/response/:id", helpsController.addResponseForHelp)
  .get("/", helpsController.getHelps);

module.exports = router;
