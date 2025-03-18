const mongoose = require("mongoose");
const createHttpErrors = require("http-errors");
const helpModel = require("../models/helpRequests.model");

// create a new help request
async function createHelp(req, res, next) {
  try {
    const { title, description, urgency, createdBy } = req.body;

    if (!title || !description || !urgency || !createdBy)
      throw createHttpErrors(400, "Missing required fields");

    const newHelp = await helpModel.create({
      title,
      description,
      urgency,
      createdBy,
    });

    res.status(201).json(newHelp);
  } catch (error) {
    next(error);
  }
}

// get all the help requests
async function getHelps(_req, res, next) {
  try {
    const helps = await helpModel.find();
    res.status(200).json(helps);
  } catch (error) {
    next(error);
  }
}

async function addResponseForHelp(req, res, next) {
  try {
    const { id } = req.params;
    const { userId, message } = req.body;

    if (!userId && !message)
      throw createHttpErrors(400, "Missing required fields");

    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw createHttpErrors(400, "Invalid id");

    const isValidUser = mongoose.isValidObjectId(userId);
    if (!isValidUser) throw createHttpErrors(400, "Invalid user id");

    const help = await helpModel.findById(id);
    if (!help) throw createHttpErrors(404, "Help not found");

    help.responses.push({ userId, message });

    await help.save();

    res.status(200).json(help);
  } catch (error) {
    next(error);
  }
}

module.exports = { createHelp, getHelps, addResponseForHelp };
