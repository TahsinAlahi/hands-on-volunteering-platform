const router = require("express").Router();
const eventsController = require("../controllers/events.controller");

router
  .post("/create", eventsController.createEvent)
  .get("/available", eventsController.getAvailableEvents)
  .get("/:id", eventsController.getEventsById)
  .post("/join/:id", eventsController.joinEvent)
  .get("/", eventsController.getEvents);

module.exports = router;
