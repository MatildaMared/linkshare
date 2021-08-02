const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const TEN_MINUTES = 10 * (60 * 1000);

const userSchema = new mongoose.Schema({
	firstName: {
		type: String
	},
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
	passwordResetToken: String,
	passwordResetExpire: Date,
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
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

userSchema.methods.getPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");
	console.log("Reset token is: ", resetToken);

	this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
	console.log("Hashed password token: ", this.passwordResetToken);

	this.passwordResetExpire = Date.now() + TEN_MINUTES;

	return resetToken;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
