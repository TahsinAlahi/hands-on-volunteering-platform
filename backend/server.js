require("dotenv").config();
const cors = require("cors");
const express = require("express");
const createHttpErrors = require("http-errors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(morgan("tiny"));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    // TODO: Fix this origin for production
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: "*",
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.send("This is Handson Backend");
});

mongoose.connect(process.env.MONGO_URI).then(
  () => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port http://localhost:${PORT}`)
    );
  },
  (error) => {
    console.log(error?.message);
  }
);
