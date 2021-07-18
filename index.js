const path = require("path");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.static(path.join(__dirname, "./client/build")))

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}... 💻`);
});