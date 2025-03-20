const eventsModel = require("../models/events.model");
const createHttpErrors = require("http-errors");
const mongoose = require("mongoose");

// creates a new event
async function createEvent(req, res, next) {
  try {
    const { title, description, category, date, time, location, createdBy } =
      req.body;

    if (
      !title ||
      !description ||
      !category ||
      !date ||
      !time ||
      !location ||
      !createdBy
    ) {
      throw createHttpErrors(400, "Missing required fields");
    }

    const newEvent = await eventsModel.create({
      title,
      description,
      category,
      date: new Date(date).toISOString(),
      time,
      location,
      createdBy,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
}

// get all the events
async function getEvents(_req, res, next) {
  try {
    const events = await eventsModel
      .find()
      .populate({ path: "createdBy", select: "name" });

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
}

// get all the available upcoming events
async function getAvailableEvents(_req, res, next) {
  try {
    const currentDate = new Date().toISOString();

    const availableEvents = await eventsModel
      .find({ $expr: { $gte: [{ $toDate: "$date" }, new Date(currentDate)] } })
      .sort({ date: 1 });

    res.status(200).json(availableEvents);
  } catch (error) {
    next(error);
  }
}

// get a single event data
async function getEventsById(req, res, next) {
  try {
    const { id } = req.params;

    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) throw createHttpErrors(400, "Invalid id");

    const event = await eventsModel
      .findById(id)
      .select("-createdAt -updatedAt");
    if (!event) throw createHttpErrors(404, "Event not found");

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
}

// TODO: update event if have enough time

// user join an event
async function joinEvent(req, res, next) {
  try {
    const { id } = req.params;

    // TODO: take user id from the jwt authenticator
    const { userId } = req.body;

    const isValidEvent = mongoose.isValidObjectId(id);
    if (!isValidEvent) throw createHttpErrors(400, "Invalid event id");

    const isValidUser = mongoose.isValidObjectId(userId);
    if (!isValidUser) throw createHttpErrors(400, "Invalid user id");

    const event = await eventsModel.findById(id);

    // throws error if user already joined
    if (event.attendees.includes(userId))
      throw createHttpErrors(400, "User already joined the event");

    event.attendees.push(userId);

    await event.save();

    res.status(200).json({
      message: "User joined the event successfully",
      event,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEvent,
  getEvents,
  getAvailableEvents,
  getEventsById,
  joinEvent,
};
