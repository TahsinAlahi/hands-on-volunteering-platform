const usersModel = require("../models/users.model");
const createHttpErrors = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create new users
async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    // Check if the user already exists
    const doesExist = await usersModel.findOne({ email });

    if (doesExist) throw createHttpErrors(409, "User already exists");

    usersModel.create({ name, email, password });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
}

// Login existing users
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await usersModel.findOne({ email });
    if (!user) throw createHttpErrors(401, "User does not exist");

    // Check if password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw createHttpErrors(401, "Invalid password");

    // Generate JWT token
    // Sends name, email and id with JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("token", token, {
      // for 3 days same expiry as JWT
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      name: user.name,
      email: user.email,
      id: user._id,
      message: "User logged in successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) throw createHttpErrors(401, "User not logged in");

    res
      .clearCookie("token")
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
  logout,
};
