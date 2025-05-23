const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const sendEmail = require("./routes/email");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/sendEmail", sendEmail);
app.use("/ping", (req, res) => {
  console.log("pong");
  res.status(200).send("pong");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
