const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jsend = require("jsend");

const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
const url = process.env.URL;
const port = process.env.PORT;

const coursesRouter = require("./Routes/courseRoutes");
const usersRouter = require("./Routes/userRoutes");

app.use("/uploads", express.static(path.join(path.join(__dirname, "uploads"))));


mongoose
  .connect(url)
  .then(() => {
    console.log("mongodb/mongoose is start");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/courses", coursesRouter);

app.use("/api/users", usersRouter);
app.all("*", (req, res) => {
  return res.status(404).json(jsend.error("page not found 404"));
});
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json(jsend.error(error.message));
});
app.listen(5000, () => {
  console.log(`Example app listening on port ${port}`);
});
