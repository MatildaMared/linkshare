const jwt = require("jsonwebtoken");
const ErrorResponse = require("./../utilities/errorResponse");
const User = require("../models/userModel");

async function getUser(req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];

		let userId = null;

		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return next(new ErrorResponse("Invalid token", 400));
			}

			userId = decoded.id;
		});

		const user = await User.findById(userId);

		if (!user) {
			return next(new ErrorResponse("User not found... Please try again", 400));
		}

		res.status(200).json({
			success: true,
			user: {
				id: user._id,
				firstName: user.firstName,
				email: user.email,
			},
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { getUser };
