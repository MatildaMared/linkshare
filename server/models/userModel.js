const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		required: [true, "Please enter an email..."],
		unique: [true, "This email is already in use..."],
	},
	password: {
		type: String,
		required: [true, "Please enter a password..."],
		minLength: [8, "Password needs to be at least 8 characters long..."],
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
