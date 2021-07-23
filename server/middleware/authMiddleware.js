const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const ErrorResponse = require("../utilities/errorResponse");

async function protectRoute(req, res, next) {
	try {
    let token;
    console.log(req.headers);

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer ")
		) {
			token = req.headers.authorization.split(" ")[1];
    }
    
    console.log("Token is: ", token);

		if (!token) {
			return next(
				new ErrorResponse("You do not have permission to access this route...", 403)
			);
		}

		const verifiedToken = await promisify(jwt.verify)(
			token,
			process.env.JWT_SECRET
		);

		const user = await User.findById(verifiedToken.id);

		if (!user) {
			return new ErrorResponse("There is no user with the provided id...", 404);
		}

		req.user = user;

		next();
	} catch (err) {
    return next(
      new ErrorResponse("You do not have permission to access this route...", 403)
		);
	}
}

module.exports = { protectRoute };
