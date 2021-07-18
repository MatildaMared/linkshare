const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const app = express();

// ### MIDDLEWARES ###

app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")))

// ### ROUTES ###

app.get("/", (req, res) => {
  res.send("Hello!");
});

// ### START SERVER AND CONNECT TO DB ###

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}... 💻`);
});

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xxuvj.mongodb.net/linkshare`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
}
).then(() => {
  console.log("Connected to database... 📝");
}).catch((err) => {
  console.log("There was an error connecting to database: ", err);
});