require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const privateRoutes = require("./routes/privateRoutes");
const { protectRoute } = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 8000;

const app = express();

// ### MIDDLEWARES ###

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/private", protectRoute);

// ### ROUTES ###

app.get("/", (req, res) => {
	res.send("Hello!");
});

// app.get("/private", (req, res) => {
// 	res.send("Private!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/private", privateRoutes);

// Error Middleware
app.use(errorHandler);

// ### START SERVER AND CONNECT TO DB ###

app.listen(PORT, () => {
	console.log(`Server up and running on port ${PORT}... 💻`);
});

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xxuvj.mongodb.net/linkshare`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: true,
		}
	)
	.then(() => {
		console.log("Connected to database... 📝");
	})
	.catch((err) => {
		console.log("There was an error connecting to database: ", err);
	});
