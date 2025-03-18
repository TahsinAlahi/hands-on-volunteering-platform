const usersModel = require("../models/users.model");
const mongoose = require("mongoose");
const createHttpErrors = require("http-errors");

// get a single user data
async function getUserData(req, res, next) {
  try {
    const { id } = req.params;

    // check if it's valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw createHttpErrors(400, "Invalid id");

    const user = await usersModel
      .findById(id)
      .select("-password -__v -createdAt -updatedAt");

    if (!user) throw createHttpErrors(404, "User not found");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// update a single users data
async function updateUserData(req, res, next) {
  try {
    const { id } = req.params;

    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw createHttpErrors(400, "Invalid id");

    const user = await usersModel.findById(id);
    if (!user) throw createHttpErrors(404, "User not found");

    const updates = req.body;

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        user[key] = updates[key];
      }
    });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = { getUserData, updateUserData };
