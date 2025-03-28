require("dotenv").config();
const cors = require("cors");
const express = require("express");
const createHttpErrors = require("http-errors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwtVerify = require("./middlewares/jwtChecker.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://handson-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.send("This is Handson Backend");
});

// Routes
app.use("/api/auth", require("./routes/auth.route.js"));
app.use("/api/users", jwtVerify, require("./routes/users.route.js"));
app.use("/api/events", jwtVerify, require("./routes/events.route.js"));
app.use("/api/help", jwtVerify, require("./routes/help.route.js"));

// All other unknown routes
app.get("*", (_req, _res) => {
  throw createHttpErrors(404, "Route not found");
});

// Error handler
app.use((err, _req, res, _next) => {
  let errorCode = 500;
  let errorMessage = "Something went wrong";

  if (createHttpErrors.isHttpError(err)) {
    errorCode = err.statusCode;
    errorMessage = err.message;
  }

  console.log(`${errorCode} - ${errorMessage}`);

  res.status(errorCode).json({
    success: false,
    message: errorMessage,
  });
});

// Connect to MongoDB
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
