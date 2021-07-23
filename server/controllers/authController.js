const User = require("../models/userModel");
const ErrorResponse = require("../utilities/errorResponse");
const sendMail = require("../utilities/sendMail");

async function signup(req, res, next) {
	try {
		const { username, email, password } = req.body;
		console.log(username, password);
		const user = await User.create({ username, email, password });

		res.status(200).json({
			success: true,
			user: {
				_id: user._id,
				token: user.getToken(),
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		next(err);
	}
}

async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(new ErrorResponse("Please enter email and password...", 400));
		}

		const user = await User.findOne({ email });
		const correctPassword = await user?.checkPassword(password, user.password);

		if (!user || !correctPassword) {
			return next(new ErrorResponse("Incorrect credentials...", 400));
		}

		res.status(200).json({
			success: true,
			user: {
				_id: user._id,
				token: user.getToken(),
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		next(err);
	}
}

async function forgotPassword(req, res) {
	try {
		const { email } = req.body;

		const resetToken = "test";

		const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

		const message = `
			<h1>Password reset request 📝</h1>
			<p>You have made a request to reset your password at Linkshare. Please follow this link to create a new password: </p>
			<a href=${resetUrl} clicktracking=off>Reset Password 💜</a>
		`;

		try {
			await sendMail({
				userEmail: email,
				subject: "Password reset request...",
				html: message,
			});

			res.status(200).json({ success: true, message: "Reset email sent..." });
		} catch (err) {
			console.log(err);
			return next(new ErrorResponse("Email could not be sent...", 500));
		}
	} catch (err) {
		next(err);
	}
}

function resetPassword(req, res) {
	console.log("Reset password");
	res.send("Reset password");
}

module.exports = { signup, login, forgotPassword, resetPassword };
