const User = require("../models/userModel");
const ErrorResponse = require("../utilities/errorResponse");
const sendMail = require("../utilities/sendMail");
const crypto = require("crypto");

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

async function forgotPassword(req, res, next) {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return next(new ErrorResponse("Email could not be sent...", 404));
		}

		const resetToken = user.getPasswordResetToken();
		console.log("Final password reset token is: ", resetToken);

		await user.save();

		const resetUrl = `http://localhost:8000/api/auth/resetpassword/${resetToken}`;

		const message = `
			<h1>Linkshare password reset request</h1>
			<p>So you forgot your password, huh? 😣 Don't worry, it happens to everyone sometimes... 😊 Just follow the link below to create a new password and you'll be back up and running in no time! </p>
			<a href=${resetUrl} clicktracking=off>Reset Password 💜</a>
		`;

		try {
			await sendMail({
				userEmail: email,
				subject: "Password reset request... 💜",
				html: message,
			});

			res.status(200).json({ success: true, message: "Reset email sent..." });
		} catch (err) {
			console.log(err);

			user.passwordResetToken = undefined;
			user.passwordResetExpire = undefined;

			await user.save();

			return next(new ErrorResponse("Email could not be sent...", 500));
		}
	} catch (err) {
		next(err);
	}
}

async function resetPassword(req, res, next) {
	try {

		const passwordResetToken = crypto
			.createHash("sha256")
			.update(req.params.resetToken)
			.digest("hex");

		const user = await User.findOne({
			passwordResetToken,
			passwordResetExpire: { $gt: Date.now() },
		});

		if (!user) {
			return next(new ErrorResponse("Invalid token...", 400));
		}

		user.password = req.body.password;
		user.passwordResetToken = undefined;
		user.passwordResetExpire = undefined;

		await user.save();

		res.status(201).json({
			success: true,
			message: "Password updated successfully!",
			token: user.getToken(),
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { signup, login, forgotPassword, resetPassword };
