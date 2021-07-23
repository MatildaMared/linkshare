const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		required: [true, "Please enter a username..."],
		unique: [true, "This username is already taken..."],
	},
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

// Run this function before user is saved/re-saved
userSchema.pre("save", async function (next) {
	const saltRounds = 10;

	// If the password wasn't modified, exit the function! Otherwise it would hash the already hashed password
	if (!this.isModified("password")) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, saltRounds);
	next();
});

userSchema.methods.checkPassword = function (enteredPassword, userPassword) {
	return bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.getToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
};

const User = mongoose.model("User", userSchema);

module.exports = User;
