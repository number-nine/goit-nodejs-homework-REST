const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { HttpError } = require("./helpers");
const path = require("path");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const userRouter = require('./routes/api/users');

const STATIC_PATH = path.join(__dirname, "public");

const app = express();


const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_PATH))

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);

app.use((req, res) => {
  throw HttpError(404, "Not found");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json(message);
});

module.exports = app;
